import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Pedido } from 'src/app/models/pedido';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

export interface DialogData {
  pedido: Pedido;
  dialog: MatDialog;
}

@Component({
  selector: 'app-rechazar-pedido',
  templateUrl: './rechazar-pedido.component.html',
  styleUrls: ['./rechazar-pedido.component.scss']
})
export class RechazarPedidoComponent implements OnInit {

  pedido: any;
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'mensajeRechazo',
      type: 'textarea',
      className: 'field-form',
      templateOptions: {
        label: 'Motivo del rechazo',
        placeholder: 'Detalle el motivo del rechazo',
        rows: 10,
        required: true,
      },
    },
  ]

  constructor(private socketService: SocketWebService ,private sanitizer: DomSanitizer, private alertService: AlertsService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, private comercioService: ComercioService) { }

  ngOnInit(): void {
    this.pedido = this.data.pedido;
  }

  rechazarPedido(model){
    this.pedido.estado = -1;
    this.pedido.motivoRechazo = model.mensajeRechazo;
    this.comercioService.rechazarPedido(this.pedido._id, model.mensajeRechazo)
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.alertService.error("Pedido Rechazado correctamente")
      this.socketService.emitEvent({text: 'actualizado'});
      this.data.dialog.closeAll();
    })

  }

}
