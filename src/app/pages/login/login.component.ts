import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs';
import { UserLogin, UserLoginRegister, UserReg } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { fieldsLogin, fieldsEmail, fieldsRegister, fieldsCodigo, nuevaPasswordFields } from './models/form-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserLogin = {
    email: '',
    password: '',
  };
  public userRegister: UserLoginRegister = {
    nombre: '',
    nombreElegido: '',
    apellido: '',
    email: '',
    password: '',
    emailActivado: false,
    terminos: false,
  };
  public emailRecuperacion =  {email: ''};
  public codigoRecuperacion = {codigo: ''};
  public nuevaPassword = {password: '', repassword: ''};
  public error: string;
  public errorReg: string;
  public submitReg: string;

  public pantallaRegistro: boolean = false;
  public pantallaRecuperar: boolean = false;
  public pantallaIniciar: boolean = true;
  public editarPass: boolean = false;

  public loading: boolean = false;
  public fieldsLogin: FormlyFieldConfig[] = fieldsLogin;
  public fieldsRegister: FormlyFieldConfig[] = fieldsRegister;
  public fieldsRecuperar: FormlyFieldConfig[] = fieldsEmail;
  public fieldsCodigo: FormlyFieldConfig[] = fieldsCodigo;
  public nuevaPasswordFields: FormlyFieldConfig[] = nuevaPasswordFields;

  public puedeRecuperar: boolean = true;
  public recuperarTexto: string = 'Enviar Código';
  segundos: number = 30;
  form = new FormGroup({});

  constructor(private accountService: AccountService,  private router: Router, private comercioService: ComercioService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }




}
