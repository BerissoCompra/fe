export const calcularDescuento = (precio: number, descuento: number) =>{
  let total = 0;
  total = precio - ((descuento * precio) / 100);
  return total;
}
