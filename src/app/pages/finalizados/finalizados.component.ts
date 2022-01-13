import { Component, OnInit } from '@angular/core';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Pedido } from 'src/app/models/pedido';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.scss']
})
export class FinalizadosComponent implements OnInit {

  public pedidos: Pedido[] = [];

  constructor(private comercioService: ComercioService) { }

  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.comercioService.getPedidos(res._id, SeguimientoEnum.FINALIZADO)
      .subscribe((res)=>{
        this.pedidos = res;
      })
    })
  }

}
