import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';
import { AccountService } from 'src/app/services/account.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import {
  fieldsGastronmico,
  fieldsClasificados,
  fieldsComercio,
  fieldsProfesionales,
} from './models/form.config';

@Component({
  selector: 'app-registrar-cuenta',
  templateUrl: './registrar-cuenta.component.html',
  styleUrls: ['./registrar-cuenta.component.scss'],
})
export class RegistrarCuentaComponent implements OnInit {
  public form = new FormGroup({});
  public model = {};
  public array = [{ label: 'hola', value: 'chau' }];
  public fields: {};
  public title: string = '';
  public type: string = '';
  constructor(
    private activeRouter: ActivatedRoute,
    private comercioService: ComercioService,
    private serviciosService: ServiciosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {

    this.activeRouter.params.subscribe((params: any) => {
      if (params.comercio === TiposCategoriasEnum.GASTRONOMICOS) {
        this.title = 'Registrar comercio';
        this.type = TiposCategoriasEnum.GASTRONOMICOS;
        this.fields = fieldsGastronmico;
      } else if (params.comercio === TiposCategoriasEnum.PROFESIONALES) {
        this.title = 'Registrarse como profesional';
        this.type = TiposCategoriasEnum.PROFESIONALES;
        this.fields = fieldsClasificados();
      } else if (params.comercio === TiposCategoriasEnum.EMPRENDEDORES) {
        this.title = 'Registrar comercio';
        this.type = TiposCategoriasEnum.EMPRENDEDORES;
        this.fields = fieldsClasificados();
      } else if (params.comercio === TiposCategoriasEnum.SERVICIOS) {
        this.title = 'Registrarse en sección Clasificados';
        this.type = TiposCategoriasEnum.SERVICIOS;
        this.fields = fieldsClasificados();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      if(this.type === TiposCategoriasEnum.GASTRONOMICOS){
        this.comercioService.crearComercio(this.model).subscribe((res) => {
          this.validarUsuario();
        });
      }
      else{
        this.model = {
          ...this.model,
          tipo: this.type
        };

        this.serviciosService.crearServicio(this.model).then((res) => {
          this.validarUsuario();
        });
      }
    }
  }

  validarUsuario(): void {
    this.accountService.validarUsuario().subscribe((res) => {
      if (res.servicio) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard/configuracion']);
      } else {
        this.router.navigate(['/servicios']);
      }
    });
  }
}
