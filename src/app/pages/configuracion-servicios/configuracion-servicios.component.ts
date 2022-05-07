import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComercioService } from 'src/app/services/comercio.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
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
  // apiLoaded: Observable<any>
  // options: google.maps.MapOptions = {
  //   center: {lat: -34.8677284428677, lng: -57.8852099070261},
  //   zoom: 12
  // };

  // center: google.maps.LatLngLiteral = {lat: -34.8677284428677, lng: -57.8852099070261};
  // zoom = 4;
  // markerOptions: google.maps.MarkerOptions = {draggable: true};
  // markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private httpClient: HttpClient ,private alertService: AlertsService, private categoriasService: CategoriasService, private imagenesService: ImagenesService, private router: Router, private comercioService: ComercioService, private serviciosService: ServiciosService) {
  }

  ngOnInit(): void {
    // this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleKey}`, 'callback')
    // .pipe(
    //   map(() => true),
    //   catchError(() => of(false)),
    // );
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
    this.loading = true;
    this.serviciosService.actualizarServicio(model).then((res)=>{
      this.loading = false;
      this.obtenerServicio();
    })
  }

}
