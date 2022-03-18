import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  ok(mensaje: string){
    this.toastr.success(mensaje, '', {
      progressBar: true,
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  }

  error(mensaje: string){
    this.toastr.error(mensaje, '', {
      progressBar: true,
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  }

  warning(mensaje: string){
    this.toastr.warning(mensaje, '', {
      progressBar: true,
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  }

  segurizacion(): boolean{
    let seguro = false;
    const codigoAdministrador = prompt("Ingrese codigo Administrador");
    if(codigoAdministrador === "123456"){
      seguro = true;
    }
    if(!seguro){
      this.error('Contraseña Incorrecta!')
    }
    return seguro;
  }


}
