export interface Product {
  _id: string;
  nombre: string;
  comercioId?: string;
  descripcion?: string;
  precio: number;
  descuento?: number;
  categoria: string;
  imagen?: string | any;
  activo: boolean;
}

export const agregarProducto = {
  id: '',
  comercioId: '',
  nombre: 'Nuevo producto',
  descripcion: '',
  precio: 0,
  imagen: '',
  descuento: 0,
  categoria: '',
}
