
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, Subject } from 'rxjs';
import { Comercio } from '../models/comercio';
import { TipoEnvio } from '../models/enums/tipo-envio';
import { Pedido } from '../models/pedido';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Usuario } from '../models/user';
import { ImagenesService } from './imagenes.service';

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
  public pedidos$ = new Subject<any>();

  private pedidoObservable$ = new Subject<boolean>();

  constructor(private http: HttpClient ,private genericService: GenericService, private imagenesService: ImagenesService) {

  }

  public changeComercio(comercio: Comercio): void {
    //this.comercioObservable.next(comercio);
  }

  setPedidos(val){
    this.pedidos$.next(val)
  }

  getPedidos$(): Observable<any>{
    return this.pedidos$.asObservable();
  }

  actualizarInfoComercio(comercio: Comercio) {
    this.comercioObservable$.next(comercio);
  }

  getComercio$(): Observable<Comercio> {
    return this.comercioObservable$.asObservable();
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

  rechazarPedido(pedidoId: any, motivo: string){
    return this.genericService.put(`${environment.urlAPI}/pedidos/${pedidoId}/rechazar`, {motivo})
  }

  crearComercio(comercio){
    return this.genericService.post(`${environment.urlAPI}/comercios`, comercio)
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


  async actualizarComercio(comercio: Comercio){
    debugger
    return new Promise(async(resolve, rejeact) =>{
      const {imagen, ...rest} = comercio;
      const imagenUrl = await this.imagenesService.subirImagen(`comercios`, comercio._id, imagen);
      this.genericService.put(`${environment.urlAPI}/comercios/${comercio._id}`, {
        ...comercio,
        imagen: imagenUrl,
      }).subscribe((res)=>{
        resolve(true)
      })
    })
  }

  public changePedidosCount(count: number): void {
    this.pedidosCount.next(count);
  }

}
