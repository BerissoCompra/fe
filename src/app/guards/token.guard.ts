import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AccountService } from '../services/account.service';
@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(): boolean{

    if(!this.accountService.isAuth()){
      console.log('Token no valido / Token expirado');
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }
}
