import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor() { }

  async comprimirImagen(file): Promise<any>{
    return new Promise((resolve, rejeact)=>{
      try {
        let resultado;
        const compresor = new Compressor(file, {
          quality: 0.4,
          // The compression process is asynchronous,
          // which means you have to access the `result` in the `success` hook function.
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
