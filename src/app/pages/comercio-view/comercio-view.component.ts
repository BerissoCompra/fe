import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Comercio } from 'src/app/models/comercio';
import { ComercioService } from 'src/app/services/comercio.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

export interface DialogData {
  comercio: Comercio;
  dialog: MatDialog;
}

@Component({
  selector: 'app-comercio-view',
  templateUrl: './comercio-view.component.html',
  styleUrls: ['./comercio-view.component.scss']
})
export class ComercioViewComponent implements OnInit {

  public comercio: Comercio;

  constructor(private sanitizer: DomSanitizer,  private socketService: SocketWebService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, private comercioService: ComercioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.comercio = this.data.comercio;
  }

  eliminarComercio(id: string){
    this.comercioService.eliminarComercio(id).subscribe();
    this.data.dialog.closeAll()
  }

  enviarEmailDePago(){

  }


}
