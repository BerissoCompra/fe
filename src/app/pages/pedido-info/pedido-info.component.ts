import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
import { downloadFile } from 'src/app/services/utils/downloadPDF';

export interface DialogData {
  comercioId: string;
  pedido: Pedido;
  productos: Product[],
  submitEv: () => void,
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
  loading: boolean = false;
  constructor(private alertService: AlertsService,  private socketService: SocketWebService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, private comercioService: ComercioService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.pedidoSeleccionado = this.data.pedido;
    this.productosPedido = this.data.productos;
    this.comercioId = this.data.comercioId;
  }

  submitFn(){
    this.comercioService.actualizarPedido(this.pedidoSeleccionado._id)
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      // this.socketService.emitEvent({text: 'actualizado'});
      this.alertService.ok('Pedido Aceptado');
    })
    this.comercioService.actualizarPedidoObservable();
    this.data.dialog.closeAll();
  }

  descargarTicket(){
    this.loading = true;
    this.comercioService.obtenerTicketPedido(this.pedidoSeleccionado._id).subscribe((res)=>{
      this.loading = false;
      const name = `${this.pedidoSeleccionado.idPedido}`;
      downloadFile(res, name);
    })
  }


  getButtonText(estado):string{
    let texto: string = '';

    if(estado === SeguimientoEnum.ESPERANDO_APROBACION){
      texto = 'Ingresar Pedido';
    }
    if(estado === SeguimientoEnum.LISTO_PARA_ABONAR){

    }
    if(estado === SeguimientoEnum.EN_CURSO){
      texto = 'Finalizar Pedido'
    }
    if(estado === SeguimientoEnum.FINALIZADO && this.pedidoSeleccionado.configuracion.envio){
      texto = 'Enviar Pedido';
    }
    if(estado === SeguimientoEnum.FINALIZADO && this.pedidoSeleccionado.configuracion.retira){
      texto = 'Listo para retirar';
    }

    return texto;
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
  rechazarPedido(){
    this.dialog.open(RechazarPedidoComponent, {
      data: {
        pedido: this.pedidoSeleccionado,
        dialog: this.dialog,
      },
    });
  }
}
