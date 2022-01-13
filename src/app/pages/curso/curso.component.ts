import { Component, OnInit } from '@angular/core';
import { SeguimientoEnum } from 'src/app/models/enums/seguimiento';
import { Pedido } from 'src/app/models/pedido';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  public pedidos: Pedido[] = [];

  constructor(private comercioService: ComercioService) { }

  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.comercioService.getPedidos(res._id, SeguimientoEnum.EN_CURSO)
      .subscribe((res)=>{
        this.pedidos = res;
      })
    })
  }
}
