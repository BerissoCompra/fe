import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Comercio } from 'src/app/models/comercio';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Pedido } from 'src/app/models/pedido';
import { ComercioService } from 'src/app/services/comercio.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { CierreCajaComponent } from './cierre-caja/cierre-caja.component';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  public pedidosIngresados: Pedido[] = [];
  public pedidosEnCurso: Pedido[] = [];
  public pedidosFinalizados: Pedido[] = [];
  public pedidosEnviados: Pedido[] = [];
  public pedidosParaRetirar: Pedido[] = [];
  public pedidosCerrados: Pedido[] = [];
  public indexActual: number = 0;

  public tipoPedido: string;
  public title: string = 'Panel de control | Pedidos';
  public comercio: Comercio;
  socket: any;
  constructor(public dialog: MatDialog,private comercioService: ComercioService, private cookiesService: CookieService ,private socketService: SocketWebService, private cookiesServices: CookieService, private _activateRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.comercioService.getPedido$().subscribe((res)=>{
      this.updateComercio(this.indexActual);
    })
    this.updateComercio();

    setInterval(()=> {
      this.updateComercio(this.indexActual);
    },300000)
  }

  async updateComercio(index?){
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.comercioService.actualizarInfoComercio(res)
      this.comercio = res;

      if(!index){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.ESPERANDO_APROBACION)
        .subscribe((res)=>{
            this.pedidosIngresados = res;
        })
      }
      else if(index === 0){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.ESPERANDO_APROBACION)
        .subscribe((res)=>{
            this.pedidosIngresados = res;
        })
      }
      else if(index === 1){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.EN_CURSO)
        .subscribe((res)=>{
          this.pedidosEnCurso = res;
        })
      }
      else if(index === 2){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.FINALIZADO)
        .subscribe((res)=>{
            this.pedidosFinalizados = res;
        })
      }
      else if(index === 3){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.ENVIADO)
        .subscribe((res)=>{
            this.pedidosEnviados = res;
        })
      }
      else if(index === 4){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.LISTO_PARA_RETIRAR)
        .subscribe((res)=>{
            this.pedidosParaRetirar = res;
        })
      }
      else if(index === 5){
        this.comercioService.getPedidos(res._id, SeguimientoEnum.CERRADO)
        .subscribe((res)=>{
            this.pedidosCerrados = res;
        })
      }
    })
  }

  changeTab($event){
    this.updateComercio($event.index)
    this.indexActual = $event.index;
  }

  updateIndex($event){
    this.updateComercio(this.indexActual);
  }

  cerrarCaja(){
    this.comercioService.obtenerCierreCaja(this.comercio._id).subscribe((res)=>{
      if(res){
        this.dialog.open(CierreCajaComponent, {
          id: 'Cierre Caja',
          width: '55%',
          maxHeight: '95%',
          data: {
            info: res,
            comercio: this.comercio
          },
        });
      }
    })
  }
}
