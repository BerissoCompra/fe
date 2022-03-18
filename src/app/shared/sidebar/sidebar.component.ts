import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable } from 'rxjs';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{


  constructor(private accountService: AccountService, private alertService: AlertsService, private comercioService: ComercioService ,private router: Router) { }

  comercio: Comercio;
  comercio$: Observable<Comercio>;
  pedidosCount: number;
  imagenDefault: string = 'https://www.uifrommars.com/wp-content/uploads/2018/08/crear-paleta-colores-diseno-ui.jpg';


  ngOnInit(): void {
    this.comercio$ = this.comercioService.getComercio$();
    this.comercio$.subscribe(comercio => this.comercio = comercio);
  }

  updateComercio(){
    this.comercioService.obtenerComercio().subscribe((res :any)=>{
      this.comercio = res;
    })
  }

  cerrarAbrir(){
    if(this.comercio.abierto){
      this.comercioService.cerrarComercio(this.comercio._id)
      .pipe(catchError((res)=>{
        const error = res.error.msg;
        this.alertService.error(error)
        throw 'error in source. Details: ' + res;
      }))
      .subscribe((ok)=>{
        this.updateComercio();
        this.alertService.warning('Comercio Cerrado');
      })
    }
    else{
      this.comercioService.abrirComercio(this.comercio._id)
      .pipe(catchError((res)=>{
        const error = res.error.msg;
        this.alertService.error(error)
        throw 'error in source. Details: ' + res;
      }))
      .subscribe((ok)=>{
        this.updateComercio();
        this.alertService.ok('Comercio Abierto');
      })
    }
  }

  cerrarSesion(){
    if(this.comercio.abierto){
      const confirma = confirm(' ¡El comercio se encuentra abierto! \n ¿Está seguro que quiere salir del sistema?')
      if(!confirma) return;
    }
    this.accountService.cerrarSesion();
  }

}
