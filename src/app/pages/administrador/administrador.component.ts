import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comercio } from 'src/app/models/comercio';
import { ComercioService } from 'src/app/services/comercio.service';
import { ComercioViewComponent } from '../comercio-view/comercio-view.component';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  constructor(private comercioServices: ComercioService) { }

  ngOnInit(): void {

  }



}
