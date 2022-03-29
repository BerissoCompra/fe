import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient, ) { }

  get<T>(url):Observable<T>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<T>(url, {headers: headers})
  }

  getAll<T>(url, params: HttpParams):Observable<T>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<T>(url, {headers: headers, params})
  }

  delete(url){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url, {headers: headers})
  }

  post(url, body){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url, body, {headers: headers})
  }

  put(url, body?:any){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url, body, {headers: headers})
  }

  getPdf(
    ruta: string,
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(ruta, { responseType: 'blob', headers: headers });
  }

}
