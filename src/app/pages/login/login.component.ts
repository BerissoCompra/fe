import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { UserLogin, UserLoginRegister, UserReg } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {email: '', password: ''};
  userRegister: UserLoginRegister = {email: '', password: '', repassword: '', nombre: '', terminos: false};
  error: string;
  errorReg: string;
  pantallaRegistro: boolean = false;
  loading: boolean = false;

  constructor(private accountService: AccountService, private router: Router, private comercioService: ComercioService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }
  form = new FormGroup({});
  // Generacion de campos del formulario de login
  fieldsLogin: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Email',
        placeholder: 'Ingrese su email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingrese su contraseña',
        required: true,
        type: 'password',

      }
    }
  ];

  fieldsRegister: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Email',
        placeholder: 'Ingrese su email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingrese su contraseña',
        required: true,
        type: 'password',

      }
    },
    {
      key: 'repassword',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Repetir Contraseña',
        placeholder: 'Ingrese nuevamente su contraseña',
        required: true,
        type: 'password',

      }
    },
    {
      key: 'nombre',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Nombre y Apellido Responsable',
        placeholder: 'Ingrese nombre y apellido',
        required: true,
      },
    },
  ];

  iniciarSesion(user: UserLogin) {
    this.loading = true;
    if(user.email.trim() === '' || user.password.trim() === ''){
      this.error = 'Complete todos los campos'
      return;
    }
    this.accountService.iniciarSesion(user)
    .subscribe((res)=>{
      if(res.token){
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard'])
      }
      else{
        console.log('Token error');
      }
    })
  }

  registrar(user: UserLoginRegister){
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
    const userSave: UserReg = {
      email: user.email,
      password: user.password,
      nombre: user.nombre,
    }
    this.accountService.crearUsuario(userSave)
    .subscribe((res)=>{
      if(res){
        console.log(res);
        if(res?.err){
          return this.errorReg = res?.err;
        }
        this.comercioService.crearComercio(res)
        .subscribe((res)=>{
          this.loading = false;
          this.pantallaRegistro = false;
          this.toastr.success('Registrado correctamente', '', {
            progressBar: true,
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
          })
        });
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
