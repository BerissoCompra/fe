
export interface Comercio {
  _id?: any;
  nombre: string;
  responsable: string;
  usuarioId: string;
  descripcion?: string;
  abierto: any;
  imagen?: any;
  imagenPath?: any;
  dias?: string[];
  categoria: string;
  puntuacion: number;
  horarios?: any[];
  envio?: string;
  costoEnvio?:number;
  estrellas?: number;
  direccion?: string;
  telefono?: string;
  pagoDigital?: any;
  pagoEfectivo?: any;
  retiro?: any;
  cuenta?: Cuenta;
  activado: boolean;
  estadisticas?: Estadisticas;
  nombreClasificado?: string;
}

export interface Estadisticas {
  ventas: number,
  ingresosTotales: number,
  deuda: number,
  ultimoPago: string,
}

export interface Cuenta {
  alias: string,
  cvu: string,
  nombreApellido: string,
  banco: string,
}
