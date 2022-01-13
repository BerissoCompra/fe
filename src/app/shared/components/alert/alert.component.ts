import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { DomSanitizer }  from '@angular/platform-browser';
import { Observable } from 'rxjs';

export interface DialogData {
  title: string;
  text: string;
  alertType: string;
  dialog: MatDialog;
}

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerta: DialogData;

  constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: DialogData, private catalogoService: CatalogoService) {

  }

  ngOnInit(): void {
    this.alerta = this.data;
  }


}
