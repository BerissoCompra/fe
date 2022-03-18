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
import { AlertsService } from 'src/app/services/alerts-services.service';
import { catchError } from 'rxjs';

export interface DialogData {
  comercioId: string;
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
  comercioId: string;

  constructor(private alertService: AlertsService,  private socketService: SocketWebService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, private comercioService: ComercioService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.pedidoSeleccionado = this.data.pedido;
    this.productosPedido = this.data.productos;
    this.comercioId = this.data.comercioId;
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
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.alertService.ok('Pedido Aceptado');
      this.data.dialog.closeAll();

    })
  }
  calcularSeguimiento(){
    if(this.pedidoSeleccionado.estado >= 1){
      if(this.pedidoSeleccionado.estado >= 3){
        if(this.pedidoSeleccionado.estado >= 5){
          return 100;
        }
        return 66.66666;
      }
      return 33.33333;
    }
    else{
      return 0;
    }
  }
  pedidoEnviado(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.ENVIADO;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.alertService.ok('Pedido Enviado');
    })
  }

  pedidoFinalizado(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.FINALIZADO;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.alertService.ok('Pedido Finalizado');
      this.comercioService.obtenerComercio()
      .subscribe((comercio)=>{
        this.comercioService.registrarVenta(comercio._id, this.pedidoSeleccionado).subscribe()
      })
    })
  }

  pedidoListoParaRetirar(){
    this.pedidoSeleccionado.estado = SeguimientoEnum.LISTO_PARA_RETIRAR;
    this.comercioService.actualizarPedido(this.pedidoSeleccionado)
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
      this.alertService.ok('Pedido Listo para Retirar');
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
