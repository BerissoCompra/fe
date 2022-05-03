import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { UserLogin, UserLoginRegister, UserReg } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { fieldsComercio, fieldsRegister } from '../../models/form-config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userRegister: UserReg = {
    nombre: '',
    nombreElegido: '',
    apellido: '',
    email: '',
    password: '',
    repassword: '',
    emailActivado: false,
    terminos: false,
  };

  public comercioConfig = {};

  public error: string;
  public errorReg: string;
  public submitReg: string;

  public pantallaRegistro: boolean = false;
  public pantallaRecuperar: boolean = false;
  public pantallaIniciar: boolean = true;
  public editarPass: boolean = false;

  public loading: boolean = false;
  public fieldsRegister: FormlyFieldConfig[] = fieldsRegister;
  public fieldsComercio: FormlyFieldConfig[] = fieldsComercio;

  public puedeRecuperar: boolean = true;
  public recuperarTexto: string = 'Enviar Código';
  segundos: number = 30;
  form = new FormGroup({});


  constructor(private accountService: AccountService,  private router: Router, private comercioService: ComercioService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  registrar(user: UserReg){
    this.loading = true;
    if(
      user.nombre.trim() === '' ||
      user.password.trim() === '' ||
      user.repassword.trim() === '' ||
      user.email.trim() === ''
    ){
      this.errorReg = 'Complete todos los campos';
      this.loading = false;
      return
    }
    if(user.password.length < 6){
      this.errorReg = 'La contraseña debe contener como mínimo 6 caracteres';
      this.loading = false;
      return
    }
    if(user.password.trim() != user.repassword.trim()){
      this.errorReg = 'Las contraseñas no coinciden';
      this.loading = false;
      return
    }
    if(!user.terminos){
      this.errorReg = 'Debe aceptar los Términos y Condiciones';
      this.loading = false;
      return
    }
    const {repassword, ...rest} = user;
    this.accountService.crearUsuario(rest)
    .pipe(
      catchError((err)=>{
        this.errorReg = 'Se ha producido un error';
        throw new err;
      })
    )
    .subscribe((res)=>{
      if(res){
        if(res?.err){
          return this.errorReg = res?.err;
        }
        this.toastr.success('Se ha enviado un email de verificación', '', {
          progressBar: true,
          timeOut: 5000,
          positionClass: 'toast-bottom-right'
        })
        this.loading = false;
        this.router.navigate([''])
      }
    })

  }

  clickTerminos($event){
    this.userRegister.terminos = $event.target.checked;
  }

  //TODO ABRIR TERMINOS
  openTerminos(){
    console.log("Abriendo terminos y condiciones...")
  }
}
