import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  controller = `auth`

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  get User(): Observable<any>{
    return null
  }

  crearUsuario(user: UserLogin): Observable<any>{
    const action = 'signup'
    return this.http.post(`${environment.urlAPI}/${this.controller}/${action}`, user)
  }

  iniciarSesion(user: UserLogin): Observable<any>{
    const action = 'signin'
    return this.http.post(`${environment.urlAPI}/${this.controller}/${action}`, user)
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isAuth(): boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }


}
