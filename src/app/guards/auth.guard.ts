import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ComercioService } from '../services/comercio.service';
import jwt_decode from 'jwt-decode';
import { RolesEnum } from '../models/enums/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private comercioService: ComercioService){}

  canActivate(): boolean{

    if(!this.accountService.isAuth()){
      console.log('Token no valido / Token expirado');
      this.router.navigate(['/']);
      return false;
    }

    const token = this.getDecodedAccessToken(this.accountService.getToken())
    if(token?.rol === RolesEnum.NUEVO){
      this.router.navigate(['/servicios']);
      console.log('No tiene rol')
      return false;
    }
    else{
      this.comercioService.obtenerComercio()
      .subscribe((res)=>{
        this.comercioService.comercio = res;
      })

      return true;
    }


  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }


}
