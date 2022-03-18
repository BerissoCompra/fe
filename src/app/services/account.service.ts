import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  controller = `auth`

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private cookiesService: CookieService
  ) { }

  get User(): Observable<any>{
    return null
  }

  recuperarClave(email: string){
    return this.http.post(`${environment.urlAPI}/${this.controller}/codigoverificacion`, {email})
  }

  verificarCodigo(email: string, codigo: string){
    return this.http.put(`${environment.urlAPI}/${this.controller}/verificarCodigo`, {email, codigo})
  }

  actualizarPassword(codigo: string, password: string, ){
    return this.http.put(`${environment.urlAPI}/${this.controller}/actualizarpassword`, {password, codigo})
  }

  activarUsuario(usuarioId: string){
    return this.http.put(`${environment.urlAPI}/${this.controller}/${usuarioId}/accountverify`, {})
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
    localStorage.removeItem('comercioId')
    this.cookiesService.deleteAll();
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

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }


}
