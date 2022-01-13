import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(): boolean{
    if(!this.accountService.isAuth()){
      console.log('Token no valido / Token expirado');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }


}
