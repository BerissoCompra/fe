
export interface Comercio {
  _id?: any;
  nombre: string;
  responsable: string;
  usuarioId: string;
  descripcion?: string;
  abierto: any;
  imagen?: any;
  dias?: string[];
  categoria: string;
  puntuacion: number;
  horarios?: string;
  envio?: string;
  costoEnvio?:number;
  direccion?: string;
  telefono?: string;
  pagoDigital?: any;
  pagoEfectivo?: any;
  retiro?: any;
  cuenta?: Cuenta;
}

export interface Cuenta {
  alias: string,
  cvu: string,
  nombreApellido: string,
  banco: string,
}
