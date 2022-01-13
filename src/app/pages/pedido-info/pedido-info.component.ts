import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Usuario } from 'src/app/models/user';
import { Pedido } from 'src/app/models/pedido';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { RechazarPedidoComponent } from '../rechazar-pedido/rechazar-pedido.component';
import { SocketWebService } from 'src/app/services/socket-web.service';

export interface DialogData {
  pedido: Pedido;
  productos: Product[],
  dialog: MatDialog;
}

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {

  pedidoSeleccionado: any;
  productosPedido: any[];
  usuarioPedido: Usuario;

  constructor(private sanitizer: DomSanitizer,  private socketService: SocketWebService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, private comercioService: ComercioService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.pedidoSeleccionado = this.data.pedido;
    this.productosPedido = this.data.productos;
  }

  aceptarPedido(){
    this.pedidoSeleccionado.estado ++;
    console.log(this.pedidoSeleccionado)
    if(this.pedidoSeleccionado.pagoEfectivo){
      this.pedidoSeleccionado.estado = SeguimientoEnum.EN_CURSO;
    }
    if(this.pedidoSeleccionado.pagoDigital){
      this.pedidoSeleccionado.estado = SeguimientoEnum.LISTO_PARA_ABONAR;
    }
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.toastr.success('Pedido Aceptado')
      this.data.dialog.closeAll();

    })
  }

  pedidoEnviado(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.ENVIADO;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.toastr.success('Pedido Enviado')
    })
  }

  pedidoFinalizado(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.FINALIZADO;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.toastr.success('Pedido Finalizado')
    })
  }

  pedidoListoParaRetirar(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.LISTO_PARA_RETIRAR;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.toastr.success('Pedido Listo para Retirar')
    })
  }

  rechazarPedido(){
    this.dialog.open(RechazarPedidoComponent, {
      data: {
        pedido: this.pedidoSeleccionado,
        dialog: this.dialog,
      },
    });
  }
}
