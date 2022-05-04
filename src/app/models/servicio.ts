import { Type } from '@angular/core';
import { Interface } from 'readline';

export interface Servicio {
  _id?: any;
  nombre?: string;
  categoria?: string;
  prioridad?: string;
  descripcion?: string;
  imagen?: any;
  imagenPath?: any;
  monto?: string;
  direccion?: string;
  contacto?: string;
  redes?: Redes;
}

type Redes = [wsp?: string, instagram?: string, facebook?: string];
