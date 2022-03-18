import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(private genericService: GenericService) { }

  agregarPublicidad(comercioId, tipo){
    return this.genericService.post(`${environment.urlAPI}/publicidad/alta`,{
      comercioId,
      tipo
    });
  }

  eliminarPublicidad(comercioId, tipo){
    return this.genericService.post(`${environment.urlAPI}/publicidad/baja`,{
      comercioId,
      tipo
    });
  }

  obtenerPublicidad(tipo){
    return this.genericService.get(`${environment.urlAPI}/publicidad/tipo/${tipo}`);
  }
}
