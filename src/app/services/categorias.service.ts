import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposCategoriasEnum } from '../models/enums/tipo-categorias';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private genericService: GenericService) { }

  getCategoriasPorTipo(tipo: TiposCategoriasEnum): Observable<any>{
    return this.genericService.get(`${environment.urlAPI}/categorias/filtro/${tipo}`);
  }

}
