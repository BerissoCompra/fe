import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { fieldsGastronmico } from './models/form.config';

@Component({
  selector: 'app-registrar-cuenta',
  templateUrl: './registrar-cuenta.component.html',
  styleUrls: ['./registrar-cuenta.component.scss']
})
export class RegistrarCuentaComponent implements OnInit {
  public form = new FormGroup({});
  public model = {};
  public fields: {};
  public title: string = '';
  public type: string = ''
  constructor(private activeRouter: ActivatedRoute, private comercioService: ComercioService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: any)=>{
      if(params.comercio === 'gastronomicos'){
        this.title = 'Registrar comercio'
        this.type = 'usuario'
        this.fields = fieldsGastronmico;
      }
      else if(params.comercio === 'profesionales'){
        this.title = 'Registrarse como profesional'
        this.type = 'servicio'
        this.fields = fieldsGastronmico;
      }
      else if(params.comercio === 'comercios'){
        this.title = 'Registrar comercio'
        this.type = 'servicio'
        this.fields = fieldsGastronmico;
      }
      else if(params.comercio === 'clasificados'){
        this.title = 'Registrarse'
        this.type = 'servicio'
        this.fields = fieldsGastronmico;
      }
    })

  }


  submit(){
    if(this.type == 'usuario'){
      this.comercioService.crearComercio(this.model).subscribe((res)=>{
        this.validarUsuario();
      })
    }
  }

  validarUsuario():void{
    this.accountService.validarUsuario().subscribe((res)=>{
      if(res.servicio){
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard'])
      }
      else{
        this.router.navigate(['/servicios'])
      }

    })
  }

}


