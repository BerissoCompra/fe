import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ComercioService } from '../services/comercio.service';

@Injectable({
  providedIn: 'root'
})
export class ComercioGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private comercioService: ComercioService){}

  canActivate(): boolean{

    if(!this.comercioService.comercio){
      this.comercioService.obtenerComercio()
      .subscribe((res)=>{
        this.comercioService.comercio = res;
      })
    }

    return true;

  }


}
