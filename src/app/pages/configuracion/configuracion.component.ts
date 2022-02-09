import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import  {  ToastrService  }  from  'ngx-toastr' ;
import { TipoEnvio } from 'src/app/models/enums/tipo-envio';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ConfiguracionNegocioFormConfig } from 'src/app/models/configuracion/configuracion-form-config';
import { Dias } from 'src/app/models/dias';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  comercioModel: Comercio;
  imagenPrevisualizacion;
  form = new FormGroup({});
  loading: boolean = false;
  fieldsConfiguracionNegocio: FormlyFieldConfig[] = ConfiguracionNegocioFormConfig();
  dias = Dias;
  diasSeleccionados: any[] = [];
  file: File;
  constructor(private sanitizer: DomSanitizer,private accountService: AccountService,public dialog: MatDialog ,private comercioService: ComercioService, private toastr: ToastrService, private imagenesService: ImagenesService) {

  }

  ngOnInit(): void {

    this.updateComercio();
  }

  updateComercio(){
    this.comercioService.obtenerComercio()
    .subscribe((res: any)=>{
      this.comercioModel = res;
      this.changeComercio(res);
      this.comercioService.comercio = res;
      if(this.comercioModel?.imagen){
        this.imagenPrevisualizacion = this.comercioModel?.imagen;
      }
    })
  }

  changeComercio(comercio) {
    this.comercioService.changeComercio(comercio);
  }

  selectDia($event){
    if(!this.comercioModel?.dias) return;
    const newArray: String[] = this.comercioModel?.dias.filter((element)=> element == $event.nombre)
    if(newArray.length > 0){
      this.comercioModel.dias = this.comercioModel?.dias.filter((element)=> element != $event.nombre)
      return;
    }
    this.comercioModel.dias.push($event.nombre)
  }

  checked(dia): Boolean{
    if(!this.comercioModel?.dias) return false;
    let newArray: String[] = this.comercioModel?.dias.filter((d)=> d === dia.nombre)
    if(newArray.length > 0){
      return true;
    }
    else{
      return false;
    }
  }

  verImagen(event){
    if(this.validarImagen(event.target.files[0])){
      this.imagenesService.comprimirImagen(event.target.files[0])
      .then((res)=>{
        this.comercioModel.imagen = res;
        this.file = event.target.files[0];
        this.extraerBase64(this.comercioModel.imagen).then((imagen: any)=>{
          this.imagenPrevisualizacion = imagen.base;
          this.loading = false;
        })
      })
      .catch((error)=>{
        console.error(error)
      })
    }
    else{
      this.toastr.error('El archivo subido no tiene el formato de imagen (.jgp / .jpeg / .png)', '', {
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
    }

  }

  validarImagen(imagen): boolean{
    this.loading = true;
    if(
      imagen.type === "image/jpg" ||
      imagen.type === "image/png" ||
      imagen.type === "image/jpeg"
    )
    {
      return true;
    }
    else{
      console.log(imagen.type)
      return false;
    }

  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })

  submitFn(configuracion: Comercio){
    if(this.validarForm(configuracion)){
      this.loading = true;
      configuracion.imagen = this.file;
      this.comercioService.actualizarComercio(configuracion)
      .then((res)=>{
        this.loading = false;
        this.updateComercio();
        this.toastr.success('Actualizado correctamente', '', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-bottom-right'
        })
      })
    }
    else{
      this.toastr.error('Debe completar todos los campos requeridos', '', {
        positionClass: 'toast-bottom-right'
      })
    }
  }



  validarForm(comercio: Comercio): boolean{
    let valido = true;
    // if(
    // //   comercio.telefono?.trim() === "" ||
    // //   comercio.descripcion?.trim() === "" ||
    // //   comercio.direccion?.trim() === "" ||
    // //   comercio.horarios?.trim() === "" ||
    // //   comercio.categoria?.trim() === "" ||
    // //   comercio.envio?.trim() === "" ||
    // //   comercio.envio === TipoEnvio.PAGO &&
    // //   !comercio.costoEnvio ||
    // //   !comercio.telefono ||
    // //   !comercio.descripcion ||
    // //   !comercio.direccion ||
    // //   !comercio.categoria ||
    // //   !comercio.envio ||
    // //   !comercio.horarios
    // // )
    // {
    //   valido = false;
    // }
    // else{
    //   valido = true;

    // }

    return valido;
  }

  alerta(title: string, text: string, alertType: string){
    this.dialog.open(AlertComponent, {
      data: {
        title: title,
        text: text,
        alertType: alertType,
        dialog: this.dialog
      },
    });
  }
}

