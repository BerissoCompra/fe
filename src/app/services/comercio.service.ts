
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Comercio } from '../models/comercio';
import { TipoEnvio } from '../models/enums/tipo-envio';
import { Pedido } from '../models/pedido';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  comercio: Comercio;
  user: Observable<any>;
  userId: string;
  pedidosCount = new BehaviorSubject<number>(0);
  private comercioObservable$ = new Subject<Comercio>();
  //public customComercio = this.comercioObservable.asObservable();
  public customPedidosCount = this.pedidosCount.asObservable();

  private pedidoObservable$ = new Subject<boolean>();

  constructor(private http: HttpClient ,private genericService: GenericService) {

  }

  public changeComercio(comercio: Comercio): void {
    //this.comercioObservable.next(comercio);
  }

  actualizarInfoComercio(comercio: Comercio) {
    this.comercioObservable$.next(comercio);
  }

  getComercio$(): Observable<Comercio> {
    return this.comercioObservable$.asObservable();
  }

  actualizarPedidoObservable() {
    this.pedidoObservable$.next(true);
  }

  getPedido$(): Observable<boolean> {
    return this.pedidoObservable$.asObservable();
  }

  getPedidos(id: string, estado: number): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/pedidos/comercio/${id}/${estado}`);
  }
  eliminarComercio(comercioId: string){
    return this.genericService.delete(`${environment.urlAPI}/comercios/${comercioId}`)
  }
  obtenerResponsable(comercioId: string){
    return this.genericService.get(`${environment.urlAPI}/comercios/${comercioId}/usuario`)
  }
  registrarVenta(comercioId: string, pedido: Pedido): Observable<any>{
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/registrarventa`, pedido)
  }
  registrarPago(comercioId: string, total): Observable<any>{
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/registrarpago`, {total})
  }
  getComercios(): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/comercios`);
  }
  activarComercio(comercioId: string): Observable<any>{
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/activar`, {})
  }
  desactivarComercio(comercioId: string): Observable<any>{
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/desactivar`, {})
  }
  actualizarPedido(pedidoId: any){
    return this.genericService.put(`${environment.urlAPI}/pedidos/${pedidoId}`, {})
  }

  crearComercio(comercio, usuario: Usuario, usuarioId: string){
    const nombre = usuario?.nombreElegido  ? usuario.nombreElegido : usuario.nombre
    comercio = {
      ...comercio,
      usuarioId,
      responsable: `${usuario.apellido}, ${usuario.nombre}`,
    }
    return this.genericService.post(`${environment.urlAPI}/comercios/new`, comercio)
  }

  obtenerComercio(): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/comercios/obtener`)
  }

  abrirComercio(comercioId: string){
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/abrir`)
  }

  cerrarComercio(comercioId: string){
    return this.genericService.put(`${environment.urlAPI}/comercios/${comercioId}/cerrar`)
  }

  obtenerCierreCaja(comercioId: string): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/comercios/cierrecaja/${comercioId}`)
  }

  cerrarCaja(comercioId: string): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/comercios/cierrecaja/${comercioId}/cerrar`)
  }

  obtenerTicketCierre(comercioId: string): Observable<any>{
    return this.genericService.getPdf(`${environment.urlAPI}/comercios/cierrecaja/${comercioId}/ticket`)
  }

  obtenerTicketPedido(pedidoId: string): Observable<any>{
    return this.genericService.getPdf(`${environment.urlAPI}/pedidos/${pedidoId}/ticket`)
  }


  actualizarComercio(comercio: Comercio){
    return new Promise((resolve, rejeact) =>{
      if(comercio.imagen?.name){
        const {imagen, ...rest} = comercio;
        const fd = new FormData();
        // fd.append('file', comercio.imagen);
        // fd.append('comercio', comercio.nombre);
        // this.genericService.post(`${environment.urlAPI}/images/upload`, fd)
        // .subscribe((res: any)=>{
          // comercio.imagen = environment.beUrl + res.path.replace('\\', '/');
          // comercio.imagenPath = res.path;
          // debugger
          // imagen.forEach((element) => {
          //   fd.append(element.name, element)
          // });

          Object.keys(rest).map((key)=>{
            fd.append(key, rest[key]);
          })

          this.genericService.put(`${environment.urlAPI}/comercios/${comercio._id}`, fd)
          .subscribe((res)=>{
            resolve(true)
          })
        //})

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

}
