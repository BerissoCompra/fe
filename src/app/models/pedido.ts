export interface Pedido {
  id: string,
  comercioId: string,
  detalle? :string,
  usuarioId: string,
  carrito: string[],
  metodoPago?: string,
  abona?: number,
  total: number,
  direccion?: string,
  retira: boolean,
  seguimiento: number,
  mensajeRechazo?: string,
  productos: any[];

}
