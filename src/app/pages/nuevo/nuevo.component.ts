import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { DomSanitizer }  from '@angular/platform-browser';
import { catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { calcularDescuento } from 'src/app/services/utils/calculos';
import { formConfig } from './models/form-config';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';

export interface DialogData {
  comercioId: string;
  action: 'nuevo' | 'editar';
  dialog: MatDialog;
  content
  refresh(): void,
}

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  title: string;
  valor: Observable<any>
  buttonText: string;
  viewDeleteButton: boolean;
  loading: boolean;
  confirmacion: boolean;
  productoModel: Product = {
    _id: null,
    comercioId: null,
    activo: true,
    nombre: '',
    categoria: '',
    descuento: 0,
    descripcion:'',
    precio: 0
  };
  file: File;
  imagenPrevisualizacion: string = 'https://www.directorioindustrialfarmaceutico.com/images/logos/sin-logo.jpg';
  archivo;
  constructor(
    private alertService: AlertsService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private catalogoService: CatalogoService,
    private toastr: ToastrService,
    private categoriaServices: CategoriasService,
    private imagenesService: ImagenesService) {
    this.valor = catalogoService.valor
  }

  ngOnInit(): void {
    this.categoriaServices.getCategoriasPorTipo(TiposCategoriasEnum.PRODUCTOS)
    .pipe(
      catchError((err)=>{
      const error = err.error.msg;
      this.loading = false;
      this.alertService.error(error)
      throw 'error in source. Details: ' + error;
    }))
    .subscribe((res)=>{
      this.fields = formConfig(res);
    })

    if(this.data.action === 'nuevo'){
      this.title = 'Añade un nuevo producto';
      this.buttonText = 'Crear';
      this.viewDeleteButton = false;
      return
    }
    else if(this.data.action === 'editar'){
      this.title = 'Vista de producto'
      this.productoModel = this.data.content;
      this.buttonText = 'Actualizar';
      this.viewDeleteButton = true;
      this.imagenPrevisualizacion = this.productoModel.imagen;
    }
  }

  verImagen(event){
    this.imagenesService.comprimirImagen(event.target.files[0])
    .then((res)=>{
      this.productoModel.imagen = res;
      const file = new File([res], event.target.files[0].name);
      this.file = file;
      this.extraerBase64(this.productoModel.imagen).then((imagen: any)=>{
        this.imagenPrevisualizacion = imagen.base;
      })
    })
    .catch((error)=>{
      console.error(error)
    })
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

  submitFn(product: Product){
    this.loading = true;
    if(this.data.action === 'nuevo'){
      product.comercioId = this.data.comercioId;
      if(product.descuento > 0){
        product.precio = calcularDescuento(product.precio, product.descuento);
      }
      console.log(product)
      product.imagen = this.file;
      this.catalogoService.addProducto(product, this.data.comercioId)
      .then((res)=>{
        this.loading = false;
        this.alertService.ok('Producto Añadido')
        this.data.dialog.closeAll();
      })
    }
    else if(this.data.action === 'editar'){
      if(product.descuento > 0){
        product.precio = calcularDescuento(product.precio, product.descuento);
      }
      product.imagen = this.file;
      this.catalogoService.actualizarProducto(product)
      .then((res)=>{
        this.loading = false;
        this.alertService.ok('Producto Actualizado')
        this.data.dialog.closeAll();
      })
    }
  }

  deleteProduct(){
    this.loading = true;
    if(this.data.action === 'editar'){
      this.catalogoService.eliminarProducto(this.productoModel)
      .then((res)=>{
        if(res){
          this.loading = false;
          this.alertService.warning('Producto Eliminado')
          this.data.dialog.closeAll();
        }
      })
    }
  }

  desactivarProducto(){
    this.catalogoService.desactivarProducto(this.productoModel._id)
    .subscribe((res)=>{
      this.loading = false;
      this.alertService.warning('Producto Desactivado')
      this.data.refresh();
      this.data.dialog.closeAll();
    })
  }

  activarProducto(){
    this.catalogoService.activarProducto(this.productoModel._id)
    .subscribe((res)=>{
      this.loading = false;
      this.alertService.ok('Producto Activado')
      this.data.refresh();
      this.data.dialog.closeAll();
    })
  }

}
