import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{


  constructor(private accountService: AccountService, private cookieService: CookieService, private comercioService: ComercioService ,private router: Router) { }

  comercio: Comercio;
  pedidosCount: number;
  imagenDefault: string = 'https://www.uifrommars.com/wp-content/uploads/2018/08/crear-paleta-colores-diseno-ui.jpg';


  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.cookieService.set('comercioId', res._id);
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
