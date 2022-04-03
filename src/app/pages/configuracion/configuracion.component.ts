import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import  {  ToastrService  }  from  'ngx-toastr' ;
import { TipoEnvio } from 'src/app/models/enums/tipo-envio';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ConfiguracionNegocioFormConfig } from 'src/app/models/configuracion/configuracion-form-config';
import { Dias } from 'src/app/models/dias';
import { catchError } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';
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
  fieldsConfiguracionNegocio: FormlyFieldConfig[] = [];
  dias = Dias;
  file: File;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private alertService: AlertsService, private categoriasService: CategoriasService, private sanitizer: DomSanitizer,private accountService: AccountService,public dialog: MatDialog ,private comercioService: ComercioService, private toastr: ToastrService, private imagenesService: ImagenesService) {
  }

  ngOnInit(): void {
    this.categoriasService.getCategoriasPorTipo(TiposCategoriasEnum.COMERCIOS).subscribe((res)=>{
      if(this.comercioModel.dias.length === 1){
        this.comercioModel.dias = this.comercioModel.dias[0].split(',')
      }
      this.fieldsConfiguracionNegocio = ConfiguracionNegocioFormConfig(res)
    })
    this.updateComercio()
  }

  async updateComercio(){
    if(this.comercioService.comercio){
      this.comercioModel = this.comercioService.comercio;
      this.comercioService.actualizarInfoComercio(this.comercioModel)
      if(this.comercioModel?.imagen){
        this.imagenPrevisualizacion = this.comercioModel?.imagen;
      }
      return;
    }
    else{
      this.comercioService.obtenerComercio()
      .subscribe((res: any)=>{
        this.comercioModel = res;
        this.comercioService.actualizarInfoComercio(this.comercioModel)
        if(this.comercioModel?.imagen){
          this.imagenPrevisualizacion = this.comercioModel?.imagen;
        }
      })
    }

  }

  verImagen(event){
    if(this.validarImagen(event.target.files[0])){
      this.imagenesService.comprimirImagen(event.target.files[0])
      .then((res)=>{
        this.comercioModel.imagen = res;
        this.file = new File([res], event.target.files[0].name);
        this.extraerBase64(this.comercioModel.imagen).then((imagen: any)=>{
          this.imagenPrevisualizacion = imagen.base;
          this.loading = false;
        })
      })
      .catch((error)=>{
        console.error(error)
        this.alertService.error('Error al procesar la imágen')
      })
    }
    else{
      this.alertService.error('El archivo subido no tiene el formato de imagen (.jgp / .jpeg / .png)')
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
    debugger
    if(this.validarForm(configuracion)){
      this.loading = true;
      configuracion.imagen = this.file;
      this.comercioService.actualizarComercio(configuracion)
      .then((res)=>{
        this.loading = false;
        this.updateComercio();
        this.alertService.ok('Actualizado Correctamente')
      }).catch((err)=>{
        const error = err.error.msg;
        this.alertService.error(error)
      })
    }
    else{
      this.alertService.error('Debe completar todos los campos requeridos')
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

