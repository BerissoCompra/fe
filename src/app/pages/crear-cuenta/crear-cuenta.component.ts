import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent implements OnInit {

  public servicios = [
    {
      nombre: 'Comercio Gastronómico',
      descripcion: 'Plan ideal para ',
      categorias: 'gastronómicos, venta de bebidas, heladerías, dieteticas',
      redirect: 'gastronomicos',
      informacion: [
        {
          texto: 'Organizá tus pedidos',
          icon: '',
          disabled: false
        },
        {
          texto: 'Catálogo online',
          icon: '',
          disabled: false
        },
        {
          texto: 'Posibilidad de ser evaluado por tus clientes',
          icon: 'star',
          disabled: false
        },
      ],
      valor: 'comercio',
      costoMensual: 0,
      comision: '5%'
    },
    {
      nombre: 'Profesionales',
      descripcion: 'Plan ideal para ',
      categorias: 'profesionales, especialistas, técnicos',
      redirect: 'profesionales',
      informacion: [
        {
          texto: 'Conecta con tus clientes directamente via whatsapp',
          icon: '',
          disabled: false
        },
        {
          texto: 'Posibilidad de ser evaluado por tus clientes',
          icon: 'star',
          disabled: false
        },
      ],
      valor: 'comercio',
      costoMensual: 1350,
      comision: null
    },
    {
      nombre: 'Comercio y Emprendedores',
      descripcion: 'Plan ideal para ',
      redirect: 'comercios',
      categorias: 'emprendedores, locales de venta en general, venta de productos',
      informacion: [
        {
          texto: 'Lleva los clientes directamente a las redes sociales',
          icon: '',
          disabled: false
        },
        {
          texto: 'informacion de contacto (Whatsapp, telefono fijo, dirección)',
          icon: '',
          disabled: false
        },
        {
          texto: 'Posibilidad de ser evaluado por tus clientes',
          icon: '',
          disabled: true
        },
      ],
      valor: 'comercio',
      costoMensual: 800,
      comision: null
    },
    {
      nombre: 'Clasificados',
      descripcion: 'Plan simple para ',
      categorias: 'todos los rubros',
      redirect: 'clasificados',
      informacion: [
        {
          texto: 'informacion de contacto (Whatsapp, telefono fijo, dirección)',
          icon: '',
          disabled: false
        },
        {
          texto: 'Posibilidad de ser evaluado por tus clientes',
          icon: '',
          disabled: true
        },
      ],
      valor: 'comercio',
      costoMensual: 800,
      comision: null
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(redirect){
    this.router.navigate([`servicios/${redirect}`]);
  }

  volver(){
    this.router.navigate([`servicios`]);
  }

}
