import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { fieldsCodigo, fieldsEmail, nuevaPasswordFields } from '../../models/form-config';


@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.scss']
})
export class RecuperarClaveComponent implements OnInit {

  public emailRecuperacion =  {email: ''};
  public codigoRecuperacion = {codigo: ''};
  public nuevaPassword = {password: '', repassword: ''};
  public error: string;
  public errorReg: string;
  public submitReg: string;

  public pantallaRecuperar: boolean = true;
  public editarPass: boolean = false;

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

  recuperarClave(){
    if(!this.puedeRecuperar) return
    this.puedeRecuperar = false;
    this.accountService.recuperarClave(this.emailRecuperacion.email)
    .pipe(
      catchError(err => {
        this.errorReg = err.error.msg;
        this.puedeRecuperar = true;
        throw 'error in source. Details: ' + err;
      }),
    )
    .subscribe(
      ()=>{
        this.errorReg = null;
        this.submitReg = `Código enviado a ${this.emailRecuperacion.email}`;
        this.puedeRecuperar = false;
        this.recuperarTexto = 'Reenviar (30 seg)'
        const interval = setInterval(()=>{
          this.segundos -= 1;
          this.recuperarTexto = `Reenviar (${this.segundos} seg)`

        }, 1000)
        setTimeout(()=>{
          this.puedeRecuperar = true;
          this.recuperarTexto = 'Reenviar';
          clearInterval(interval);
          this.submitReg = null;
          this.segundos = 30;
        }, 30001)
      }
    )
  }

  verificarCodigo(){
    this.accountService.verificarCodigo(this.emailRecuperacion.email, this.codigoRecuperacion.codigo)
    .pipe(
      catchError((err)=>{
        this.errorReg = err.error.msg;
        this.submitReg = '';
        throw 'error in source. Details: ' + err;
      })
    )
    .subscribe((res)=>{
      this.errorReg = '';
      this.submitReg = '';
      this.editarPass = true;
      this.pantallaRecuperar = false;
    })
  }

  actualizarPassword(){
    if(this.vPassword(this.nuevaPassword.password, this.nuevaPassword.repassword)){
      this.accountService.actualizarPassword(this.codigoRecuperacion.codigo, this.nuevaPassword.password)
      .pipe(
        catchError((err)=>{
          this.errorReg = err.error.msg;
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe((res)=>{
        this.editarPass = false;
        this.router.navigate([''])
      })
    }
  }

  vPassword(password: string, rePassword: string): boolean{
    this.submitReg = '';
    if(password.trim() == '' || rePassword.trim() == ''){
      this.errorReg = 'Complete todos los campos';
      return false
    }
    if(password.trim() != rePassword.trim()){
      this.errorReg = 'Las contraseñas no coinciden';
      return false
    }
    if(password.length < 6){
      this.errorReg = 'La contraseña debe contener como mínimo 6 caracteres';
      return false
    }
    return true;
  }

}
