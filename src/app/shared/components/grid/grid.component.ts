import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comercio } from 'src/app/models/comercio';
import { ComercioViewComponent } from 'src/app/pages/comercio-view/comercio-view.component';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  comercios: Comercio[] = []
  constructor(private comercioServices: ComercioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateData();
  }

  updateData(){
    this.comercioServices.getComercios().subscribe((res)=>{
      this.comercios = res;
    })
  }

  viewComercio(comercio: Comercio){
    const dialog = this.dialog.open(ComercioViewComponent, {
      data: {
        comercio,
        dialog: this.dialog,
      },
    });

    dialog.afterClosed().subscribe(()=> this.updateData())
  }

  activarComercio(comercioId: string, activado: boolean){
    if(activado){
      this.comercioServices.desactivarComercio(comercioId).subscribe(()=>{
        this.updateData();
      })
    }
    if(!activado){
      this.comercioServices.activarComercio(comercioId).subscribe(()=>{
        this.updateData();
      })
    }
  }

  registrarPago(comercioId: string, total){
    const codigoAdministrador = prompt("Ingrese codigo Administrador");

    if(codigoAdministrador === "123456"){
      this.comercioServices.registrarPago(comercioId, total).subscribe((ok)=>{
        this.updateData();
      })
    }
    else{
      alert("Código Incorrecto")
      return;
    }
  }


}
