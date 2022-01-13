import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private accountService: AccountService, private comercioService: ComercioService ,private router: Router) { }

  showFiller = false;
  comercio: Comercio;
  pedidosCount: number;

  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.comercioService.changeComercio(res)
      this.comercioService.customComercio.subscribe((com)=>{
        this.comercioService.comercio = com;
        this.comercio = this.comercioService.comercio;
      })
    })
  }

  updateComercio(){
    this.comercioService.obtenerComercio().subscribe((res :any)=>{
      this.comercio = res;
    })
  }

  cerrarAbrir(){
    if(this.comercio.abierto){
      this.comercioService.actualizarComercio({
        ...this.comercio,
        abierto: false,
      }).then((res)=>{
        this.updateComercio();
      })
    }
    else{
      this.comercioService.actualizarComercio({
        ...this.comercio,
        abierto: true,
      }).then((res)=>{
        this.updateComercio();
      })
    }
  }

  cerrarSesion(){
    this.accountService.cerrarSesion();
  }


}
