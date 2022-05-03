import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Compressor from 'compressorjs';
import { catchError, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private storage: AngularFireStorage) { }

  eliminarImagen(path: string, id: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      try {
        const storageRef = this.storage.ref(`/uploads/${path}/${id}`);
        storageRef.delete().pipe(
          finalize(() => {
            resolve(true)
          })
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  subirImagen(path: string, id: string, imagen): Promise<any>{
    return new Promise(async(resolve, rejeact)=>{
      try {
        const imagenComprimida = await this.comprimirImagen(imagen);
        const storageRef = this.storage.ref(`/uploads/${path}/${id}`);
        const uploadTask = this.storage.upload(`/uploads/${path}/${id}`, imagen);
        uploadTask.snapshotChanges().pipe(
          catchError((err)=>{
            rejeact('Error al cargar la imagen: ')
            throw err;
          }),
          finalize(() => {
            storageRef.getDownloadURL().subscribe((dataUrl)=>{
              resolve(dataUrl)
            })
          })
        ).subscribe();
      } catch (error) {
        rejeact('Error al cargar la imagen: ',)
      }
    })
  }

  async comprimirImagen(file): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
        let resultado;
        const compresor = new Compressor(file, {
          quality: 0.4,
          success(result) {
            resultado = result;
            resolve(resultado);
          },
          error(err) {
            console.log(err.message);
          },
        });
      } catch (error) {

      }
    })
  }
}
