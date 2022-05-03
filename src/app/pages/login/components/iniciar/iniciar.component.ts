import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { UserLogin } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { fieldsLogin } from '../../models/form-config';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss']
})
export class IniciarComponent implements OnInit {

  public user: UserLogin = {
    email: '',
    password: '',
  };

  public error: string;
  public errorReg: string;
  public submitReg: string;

  public loading: boolean = false;
  public fieldsLogin: FormlyFieldConfig[] = fieldsLogin;
  form = new FormGroup({});

  constructor(private accountService: AccountService,  private router: Router, private comercioService: ComercioService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  iniciarSesion(user: UserLogin) {
    this.loading = true;
    if(user.email.trim() === '' || user.password.trim() === ''){
      this.error = 'Complete todos los campos'
      return;
    }
    this.accountService.iniciarSesion(user)
    .pipe(
      catchError((err)=>{
      this.error = err.error.msg;
      this.loading = false;
      throw 'error in source. Details: ' + err;
    }))
    .subscribe((res)=>{
      if(res)
      {
        if(res.activado === true && res.token){
          this.loading = false;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/servicios'])
        }
        else{
          this.error = 'Esta cuenta no está verificada'
          this.loading = false;
          return
        }
      }
    })
  }
}
