import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { formConfig } from './models/configuracion-form-config';

@Component({
  selector: 'app-configuracion-servicios',
  templateUrl: './configuracion-servicios.component.html',
  styleUrls: ['./configuracion-servicios.component.scss']
})
export class ConfiguracionServiciosComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = []
  model = {}
  loading = false;

  constructor(private alertService: AlertsService, private categoriasService: CategoriasService, private imagenesService: ImagenesService, private router: Router, private comercioService: ComercioService, private serviciosService: ServiciosService) {
  }

  ngOnInit(): void {
    this.obtenerServicio();
  }

  obtenerServicio(){
    this.comercioService.obtenerComercio().subscribe((servicio)=>{
      this.model = servicio;
      this.comercioService.changeComercio(servicio)
      this.categoriasService.getCategoriasPorTipo(TiposCategoriasEnum.SERVICIOS).subscribe((categorias)=>{
        this.fields = formConfig(categorias);
      })
    })
  }

  submitFn(model){
    debugger
    this.loading = true;
    this.serviciosService.actualizarServicio(model).then((res)=>{
      this.loading = false;
      this.obtenerServicio();
    })
  }

}
