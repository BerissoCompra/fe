import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { Pedido } from 'src/app/models/pedido';
import { PedidoInfoComponent } from 'src/app/pages/pedido-info/pedido-info.component';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  @Input() pedido: Pedido;
  @Input() posicion: number;
  productos: Product[] = [];
  usuario: string;
  total: number = 0;
  @Output() submitEvent = new EventEmitter<boolean>(false);

  constructor(private comercioService: ComercioService, public dialog: MatDialog ) { }

  ngOnInit(): void {
  }


  getDescuento(producto): number{
    let total = 0;
    const precio = producto.precio;
    const descuento = producto.descuento;
    total = precio - ((descuento * precio) / 100);
    return total;
  }

  obtenerFechaHora(timestamp){
    const date = new Date(timestamp.seconds * 1000);
    let seconds = date.getSeconds() < 10  ? `0${date.getSeconds()}` : `${date.getSeconds()}`
    let hours = date.getHours() < 10  ? `0${date.getHours()}` : `${date.getHours()}`
    let min = date.getMinutes() < 10  ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} | ${hours}:${min}:${seconds}`;
  }

  submitEventFn() {
    this.submitEvent.emit(!this.submitEvent);
  }


  viewPedido(){
    const dialog = this.dialog.open(PedidoInfoComponent, {
      data: {
        pedido: this.pedido,
        productos: this.pedido.productos,
        submitEv: this.submitEventFn.bind(this),
        dialog: this.dialog,
      },
    });

    dialog.afterClosed().subscribe((res)=>{
      this.submitEventFn();
    })
  }

}
