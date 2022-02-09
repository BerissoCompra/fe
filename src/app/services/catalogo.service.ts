import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth,
     private storage: AngularFireStorage,
     private genericService: GenericService) { }
  valor: Observable<any>;


  getProductos(id: string): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/catalogo/productos/${id}`);
  }

  addProducto(producto: Product, comercioId: string): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
        if(producto.imagen?.name){
          const fd = new FormData();
          fd.append('file', producto.imagen)
          this.genericService.post(`${environment.urlAPI}/images/upload`, fd)
          .subscribe((res: any)=>{
            producto.imagenPath = res.path;
            producto.imagen = environment.beUrl + res.path.replace('\\', '/');
            this.genericService.post(`${environment.urlAPI}/catalogo/productos/nuevo`, {producto})
              .subscribe((res)=>{
                resolve(true);
            })
          })
        }
      } catch (error) {
        rejeact(error);
      }
    })
  }

  eliminarProducto(producto: Product): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
          this.genericService.delete(`${environment.urlAPI}/catalogo/productos/${producto._id}`)
          .subscribe((ok)=>{
            resolve(true)
          })
      } catch (error) {
        rejeact(error)
      }
    })
  }

  actualizarProducto(producto: Product): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
        if(producto.imagen?.name){
          const fd = new FormData();
          fd.append('file', producto.imagen)
          this.genericService.post(`${environment.urlAPI}/images/upload`, fd)
          .subscribe((res: any)=>{
            producto.imagenPath = res.path;
            producto.imagen = environment.beUrl + res.path.replace('\\', '/');
            this.genericService.put(`${environment.urlAPI}/catalogo/productos/${producto._id}`, {producto})
              .subscribe((res)=>{
                resolve(true);
            })
          })
        }
      }
      catch (error) {
        rejeact(error)
      }
    })
  }

  activarProducto(producto: Product){
    const body = {
      id: producto._id,
      activo: true,
    }
    return this.genericService.put(`${environment.urlAPI}/catalogo/productos/${producto._id}`, body)
  }

  desactivarProducto(producto: Product){
    const body = {
      id: producto._id,
      activo: false,
    }
    return this.genericService.put(`${environment.urlAPI}/catalogo/productos/${producto._id}`, body)
  }

}
