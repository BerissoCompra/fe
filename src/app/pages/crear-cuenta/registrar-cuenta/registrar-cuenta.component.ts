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
    this.categoriasService
      .getCategoriasPorTipo(TiposCategoriasEnum.SERVICIOS)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(this.array);
    this.activeRouter.params.subscribe((params: any) => {
      if (params.comercio === 'gastronomicos') {
        this.title = 'Registrar comercio';
        this.type = 'usuario';
        this.fields = fieldsGastronmico;
      } else if (params.comercio === 'profesionales') {
        this.title = 'Registrarse como profesional';
        this.type = 'servicio';
        this.fields = fieldsProfesionales;
      } else if (params.comercio === 'comercios') {
        this.title = 'Registrar comercio';
        this.type = 'servicio';
        this.fields = fieldsComercio;
      } else if (params.comercio === 'clasificados') {
        this.title = 'Registrarse como un servicio';
        this.type = 'servicio';
        this.fields = fieldsClasificados(this.array);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      switch (this.type && this.fields) {
        case 'usuario' && fieldsGastronmico:
          this.comercioService.crearComercio(this.model).subscribe((res) => {
            this.validarUsuario();
          });
          break;

        case 'servicio' && fieldsClasificados:
          this.serviciosService.crearServicio(this.model);
          this.validarUsuario();
          break;
      }
    }
  }

  validarUsuario(): void {
    this.accountService.validarUsuario().subscribe((res) => {
      console.log(res);
      if (res.servicio) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/servicios']);
      }
    });
  }
}
