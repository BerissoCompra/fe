import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Pedido } from 'src/app/models/pedido';
import { ComercioService } from 'src/app/services/comercio.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  public pedidos: Pedido[] = [];
  public tipoPedido: string;
  public title: string = '';
  constructor(private comercioService: ComercioService, private cookiesService: CookieService ,private socketService: SocketWebService, private cookiesServices: CookieService, private _activateRouter: ActivatedRoute) {
    this.socketService.outEven.subscribe((res)=>{
      this.updateComercio();
    })
  }

  ngOnInit(): void {
    this.updateComercio();
  }

  async updateComercio(){
    const param = await this._activateRouter.params.subscribe((param: {pedido?: string, title?: string}) => {
      this.tipoPedido = param.pedido;
      this.title = param.pedido;
      this.comercioService.obtenerComercio()
      .subscribe((res)=>{
        this.comercioService.actualizarInfoComercio(res)
        this.cookiesService.set('comercioId', res._id);
        let estado = 0;
        if(this.tipoPedido === 'pedidos'){
          estado = SeguimientoEnum.ESPERANDO_APROBACION;
        }
        if(this.tipoPedido === 'curso'){
          estado = SeguimientoEnum.EN_CURSO;
        }
        if(this.tipoPedido === 'finalizados'){
          estado = SeguimientoEnum.FINALIZADO;
        }
        if(this.tipoPedido === 'enviados'){
          estado = SeguimientoEnum.ENVIADO;
        }
        this.comercioService.getPedidos(res._id, estado)
        .subscribe((res)=>{
          this.pedidos = res;
        })
      })
    })

  }

}
