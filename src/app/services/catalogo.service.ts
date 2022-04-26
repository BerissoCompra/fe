import { Injectable } from '@angular/core';
import { finalize, Observable, Subject } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { ImagenesService } from './imagenes.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private genericService: GenericService, private imagenesService: ImagenesService) { }
  valor: Observable<any>;


  getProductos(id: string): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/catalogo/productos/${id}`);
  }

  addProducto(producto: Product, comercioId: string): Promise<any>{
    return new Promise(async(resolve, rejeact)=>{
      try {
        const {_id, ...rest}= producto;
        this.genericService.post(`${environment.urlAPI}/catalogo/productos/nuevo`, {
          ...rest,
          imagen: '',
        }).subscribe(async(res: any)=>{
            if(res){
              const imagenUrl = await this.imagenesService.subirImagen(`productos`,res.id, producto.imagen);
              this.genericService.put(`${environment.urlAPI}/catalogo/productos/${res.id}`,{
                imagen: imagenUrl
              }).subscribe((res)=>{
                resolve(true);
              })
            }
        })
      } catch (error) {
        rejeact(error);
      }
    })
  }

  eliminarProducto(producto: Product): Promise<any>{
    return new Promise(async(resolve, rejeact)=>{
      try {
          this.imagenesService.eliminarImagen(`productos`, producto._id ).catch(()=> resolve(true));
          this.genericService.delete(`${environment.urlAPI}/catalogo/productos/${producto._id}`)
          .subscribe(async(ok)=>{
            resolve(true)
          })
      } catch (error) {
        rejeact(error)
      }
    })
  }

  actualizarProducto(producto: Product): Promise<any>{
    return new Promise(async(resolve, rejeact)=>{
      try {

        const {_id, imagen} = producto;
        console.log(imagen)
        if(imagen){
          const imagenUrl = await this.imagenesService.subirImagen(`productos`, _id, imagen).catch((err)=> rejeact(err));
          this.genericService.put(`${environment.urlAPI}/catalogo/productos/${_id}`, {
            ...producto,
            imagen: imagenUrl
          })
          .subscribe((res)=>{
            resolve(true);
          })
        }
        else{
          const {imagen, ...rest} = producto;
          this.genericService.put(`${environment.urlAPI}/catalogo/productos/${_id}`, {
            ...rest,
          })
          .subscribe((res)=>{
            resolve(true);
          })
        }
      }
      catch (error) {
        rejeact(error)
      }
    })
  }

  activarProducto(productoId: string){
    return this.genericService.put(`${environment.urlAPI}/catalogo/productos/${productoId}/activar`, {})
  }

  desactivarProducto(productoId: string){
    return this.genericService.put(`${environment.urlAPI}/catalogo/productos/${productoId}/desactivar`, {})
  }

}
