import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Comercio } from 'src/app/models/comercio';
import { ComercioService } from 'src/app/services/comercio.service';
import { DatePipe } from '@angular/common';
import { downloadFile } from 'src/app/services/utils/downloadPDF';
import { AlertsService } from 'src/app/services/alerts-services.service';

export interface DialogData {
  info: any;
  comercio: Comercio
}


@Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.scss']
})
export class CierreCajaComponent implements OnInit {
  public info: any;
  public comercio: Comercio;
  public fecha: Date = new Date();
  public loading: boolean = false;
  constructor(private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: DialogData, private alertaService: AlertsService, private comercioService: ComercioService, public dialog: MatDialog) {
    this.info = this.data.info;
    this.comercio = this.data.comercio;
  }

  ngOnInit(): void {
  }

  cerrarCaja(){
    this.comercioService.cerrarCaja(this.comercio._id).subscribe((res)=>{
      this.alertaService.ok(res.msg)
    })
    this.dialog.closeAll();
  }

  descargarPdf(){
    this.loading = true;
    this.comercioService.obtenerTicketCierre(this.comercio._id).subscribe((res: any)=>{
      this.loading = false;
      const fecha = this.datePipe.transform(Date.now(),'dd-MM-yyyy')
      const name = `${fecha}_CIERRECAJA`;
      downloadFile(res, name);
    })
  };
}
