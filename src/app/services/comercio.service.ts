
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Comercio } from '../models/comercio';
import { TipoEnvio } from '../models/enums/tipo-envio';
import { Pedido } from '../models/pedido';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  comercio: Comercio;
  user: Observable<any>;
  userId: string;
  pedidosCount = new BehaviorSubject<number>(0);
  private comercioObservable = new BehaviorSubject<any>({});
  public customComercio = this.comercioObservable.asObservable();

  public customPedidosCount = this.pedidosCount.asObservable();


  constructor(private firestore: AngularFirestore, private http: HttpClient ,private genericService: GenericService, private storage: AngularFireStorage) {

  }

  public changeComercio(comercio: Comercio): void {
    this.comercioObservable.next(comercio);
  }

  getPedidos(id: string, estado: number): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/pedidos/comercio/${id}/${estado}`);
  }

  actualizarPedido(pedido: any){
    return this.genericService.put(`${environment.urlAPI}/pedidos/${pedido._id}`, pedido)
  }

  crearComercio(usuario){
    const comercio: Comercio = {
      nombre: `Comercio de ${usuario.nombre}`,
      categoria: '',
      usuarioId: usuario._id,
      puntuacion: 0,
      responsable: usuario.nombre,
      descripcion: '',
      costoEnvio: 0,
      retiro: false,
      pagoDigital: false,
      pagoEfectivo: false,
      horarios: '',
      direccion: '',
      imagen: '',
      envio: '',
      abierto: false,
      dias: [],
      telefono: '',
    }
    return this.genericService.post(`${environment.urlAPI}/comercios/new`, comercio)
  }

  obtenerComercio(): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/comercios/obtener`)
  }

  actualizarComercio(comercio: Comercio){
    return new Promise((resolve, rejeact) =>{
      if(comercio.imagen?.name){
        const filePath = `imagenesProductos/comercio_${comercio._id}`;
        const task = this.storage.upload(filePath, comercio.imagen)
        if(comercio.envio === TipoEnvio.GRATIS){
          comercio.costoEnvio = 0;
        }
        task.snapshotChanges()
            .pipe(finalize(()=>{
              this.storage.ref(filePath)
              .getDownloadURL().subscribe((resImg)=>{
                if(resImg){
                  comercio.imagen = resImg;
                  this.genericService.put(`${environment.urlAPI}/comercios/${comercio._id}`, comercio)
                  .subscribe((res)=>{
                    this.changePedidosCount(1);
                    resolve(true)
                  })

                }
              })
        })).subscribe()
      }
      else{
        this.genericService.put(`${environment.urlAPI}/comercios/${comercio._id}`, comercio)
        .subscribe((res)=>{
          resolve(true)
        })
      }
    })


  }

  public changePedidosCount(count: number): void {
    this.pedidosCount.next(count);
  }

  getProductoById(id: string): Observable<any>{
    return this.firestore.collection('comerciantes').doc(this.userId).collection('catalogo').doc(id).valueChanges();
  }

  getComercioConfig(): Observable<any>{
    return this.firestore.collection('comerciantes').doc(this.userId).valueChanges();
  }

}
