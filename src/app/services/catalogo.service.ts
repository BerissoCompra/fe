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
          const filePath = `imagenesProductos/product_${producto._id}`;
          const task = this.storage.upload(filePath, producto.imagen);
          task.snapshotChanges()
          .pipe(finalize(()=>{
          this.storage.ref(filePath)
          .getDownloadURL().subscribe((resImg)=>{
            if(resImg){
              producto.imagen = resImg;
              this.genericService.post(`${environment.urlAPI}/catalogo/nuevo/${comercioId}`, producto)
              .subscribe((res)=>{
                resolve(true);
              })
            }
          })
          })).subscribe()
        }
        else{
          this.genericService.post(`${environment.urlAPI}/catalogo/nuevo/${comercioId}`, producto)
          .subscribe((res)=>{
            resolve(true);
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
        if(producto.imagen){
          const filePath = `imagenesProductos/product_${producto._id}`;
          const task = this.storage.ref(filePath).delete()
          task.subscribe(()=>{
            this.genericService.delete(`${environment.urlAPI}/catalogo/productos/${producto._id}`)
            .subscribe((ok)=>{
              resolve(true)
            })
          });
        }
        else{
          this.genericService.delete(`${environment.urlAPI}/catalogo/productos/${producto._id}`)
          .subscribe((ok)=>{
            resolve(true)
          })
        }
      } catch (error) {
        rejeact(error)
      }
    })
  }

  actualizarProducto(producto: Product): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
        if(producto.imagen?.name){
          const filePath = `imagenesProductos/product_${producto._id}`;
          const task = this.storage.upload(filePath, producto.imagen)
          task.snapshotChanges()
          .pipe(finalize(()=>{
          this.storage.ref(filePath)
          .getDownloadURL().subscribe((resImg)=>{
            if(resImg){
              producto.imagen = resImg;
              this.genericService.put(`${environment.urlAPI}/catalogo/productos/${producto._id}`, producto)
              .subscribe((res)=>{
                resolve(true);
              })
            }
          })
          })).subscribe()
        }
        else{
          this.genericService.put(`${environment.urlAPI}/catalogo/productos/${producto._id}`, producto)
          .subscribe((res)=>{
            resolve(true);
          })
        }
      } catch (error) {
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

  // async updateProducto(producto: Product): Promise<any>{
  //   this.auth.user
  //   .subscribe((res)=>{
  //     if(producto.imagen?.name){
  //       const filePath = `imagenesProductos/product_${producto.id}`;
  //       const task = this.storage.upload(filePath, producto.imagen)
  //       task.snapshotChanges()
  //       .pipe(finalize(()=>{
  //         this.storage.ref(filePath)
  //         .getDownloadURL().subscribe((resImg)=>{
  //           if(resImg){
  //             producto.imagen = resImg;
  //             this.firestore.collection('comerciantes').doc(producto.comercioId).collection('catalogo').doc(producto.id).update(producto)
  //           }
  //         })
  //       })).subscribe()
  //     }
  //     else{
  //         this.firestore.collection('comerciantes').doc(producto.comercioId).collection('catalogo').doc(producto.id).update(producto)
  //     }

  //   })
  // // }

  // async deleteProducto(producto: Product): Promise<any>{
  //   return new Promise((resolve, rejeact)=>{
  //     try {
  //       this.firestore.collection('comerciantes').doc(producto.comercioId).collection('catalogo').doc(producto.id).delete()
  //       .finally(()=>{
  //         const filePath = `imagenesProductos/product_${producto.id}`;
  //         const ref = this.storage.ref(filePath).delete();
  //         location.reload();
  //         resolve(true)
  //       })

  //     } catch (error) {

  //     }
  //   })
  // }

  // async desactivarProducto(producto: Product): Promise<any>{
  //   return new Promise((resolve, rejeact)=>{
  //     try {
  //       this.firestore.collection('comerciantes').doc(producto.comercioId).collection('catalogo').doc(producto.id).update({
  //         ...producto,
  //         activo: false
  //       })
  //       resolve(true);
  //     } catch (error) {

  //     }
  //   })
  // }
  // async activarProducto(producto: Product): Promise<any>{
  //   return new Promise((resolve, rejeact)=>{
  //     try {
  //       this.firestore.collection('comerciantes').doc(producto.comercioId).collection('catalogo').doc(producto.id).update({
  //         ...producto,
  //         activo: true
  //       })
  //       resolve(true);
  //     } catch (error) {

  //     }
  //   })
  // }

}
