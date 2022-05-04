import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Servicio } from '../models/servicio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { ImagenesService } from './imagenes.service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  servicio: Servicio;
  service: Observable<any>;
  serviceId: string;
  private servicioObservable$ = new Subject<Servicio>();
  //public customComercio = this.comercioObservable.asObservable();

  constructor(
    private http: HttpClient,
    private imagenesService: ImagenesService,
    private genericService: GenericService
  ) {}

  //   actualizarInfoComercio(comercio: Comercio) {
  //     this.comercioObservable$.next(comercio);
  //   }

  //   getComercio$(): Observable<Comercio> {
  //     return this.comercioObservable$.asObservable();
  //   }

  getServiciosById(id: string): Observable<any> {
    return this.genericService.get(`${environment.urlAPI}/servicios/${id}`);
  }

  getServicios(): Observable<any> {
    return this.genericService.get(`${environment.urlAPI}/servicios`);
  }

  deleteServicio(serviceId: string) {
    return this.genericService.delete(
      `${environment.urlAPI}/servicios/${serviceId}`
    );
  }

  activarServicio(serviceId: string): Observable<any> {
    return this.genericService.put(
      `${environment.urlAPI}/servicios/${serviceId}/activar`,
      {}
    );
  }

  desactivarServicio(serviceId: string): Observable<any> {
    return this.genericService.put(
      `${environment.urlAPI}/servicios/${serviceId}/desactivar`,
      {}
    );
  }

  crearServicio(servicio, serviceId?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const Service: Servicio = {
          _id: serviceId,
          ...servicio,
          imagen: '',
        };
        this.genericService
          .post(`${environment.urlAPI}/servicios/crear`, Service)
          .subscribe(async (res: any) => {
            if (res) {
              const imagenUrl = await this.imagenesService.subirImagen(
                `servicios`,
                res.id,
                servicio.imagen[0]
              );
              console.log(res.id, imagenUrl);
              this.genericService
                .put(`${environment.urlAPI}/servicios/${res.id}`, {
                  imagen: imagenUrl,
                })
                .subscribe((res) => {
                  resolve(true);
                });
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  actualizarServicio(servicio: Servicio) {
    return new Promise(async (resolve, reject) => {
      const { imagen, ...rest } = servicio;
      const imagenUrl = await this.imagenesService.subirImagen(
        `servicios`,
        servicio._id,
        imagen[0]
      );
      this.genericService
        .put(`${environment.urlAPI}/servicios/${servicio._id}`, {
          ...servicio,
          imagen: imagenUrl,
        })
        .subscribe((res) => {
          resolve(true);
        });
    });
  }
}
