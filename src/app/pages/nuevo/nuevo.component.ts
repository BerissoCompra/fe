import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { DomSanitizer }  from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  comercioId: string;
  action: 'nuevo' | 'editar';
  dialog: MatDialog;
  content
}

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  form = new FormGroup({});
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

  imagenPrevisualizacion: string = 'https://www.directorioindustrialfarmaceutico.com/images/logos/sin-logo.jpg';
  archivo;
  constructor(private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private catalogoService: CatalogoService,
    private toastr: ToastrService,
    private router: Router,
    private imagenesService: ImagenesService) {
    this.valor = catalogoService.valor
  }

  ngOnInit(): void {
    if(this.data.action === 'nuevo'){
      this.title = 'Añade un nuevo producto';
      this.buttonText = 'Crear producto';
      this.viewDeleteButton = false;
      return
    }
    else if(this.data.action === 'editar'){
      this.title = 'Vista de producto'
      this.productoModel = this.data.content;
      this.buttonText = 'Actualizar producto';
      this.viewDeleteButton = true;
      this.imagenPrevisualizacion = this.productoModel.imagen;
    }
  }

  fieldsRegister: FormlyFieldConfig[] = [
    {
      key: 'nombre',
      type: 'input',
      className: 'field-form',

      templateOptions: {
        label: 'Título',
        placeholder: 'Ingrese título',
        required: true,

      },
    },
    {
      key: 'descripcion',
      type: 'textarea',
      className: 'field-form',
      templateOptions: {
        label: 'Descripción',
        placeholder: 'Ingrese descripcion breve',
        required: true,
        rows: 5,
      }
    },
    {
      key: 'precio',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Precio',
        placeholder: 'Ingrese el precio',
        required: true,
        type: 'number',

      }
    },
    {
      key: 'descuento',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Descuento %',
        placeholder: 'Ingrese descuento (sin %)',
      },
    },
    {
      key: 'categoria',
      type: 'select',
      className: 'field-form',
      templateOptions: {
        label: 'Seleccione categoria',
        placeholder: '',
        options: [
          {
            label: 'Restaurante',
            value: 'restaurante',
          },
          {
            label: 'Café',
            value: 'cafe'
          },
          {
            label: 'Bebidas',
            value: 'bebidas'
          },
          {
            label: 'Flores',
            value: 'flores'
          },
          {
            label: 'Mercado',
            value: 'mercado'
          },
          {
            label: 'Tienda',
            value: 'tienda'
          },
          {
            label:  'Kiosco',
            value: 'kiosco'
          },
          {
            label: 'Mascotas',
            value: 'mascotas'
          },
          {
            label: 'Farmacia',
            value: 'farmacia'
          },
        ]
      },
    },
  ];

  verImagen(event){
    this.imagenesService.comprimirImagen(event.target.files[0])
    .then((res)=>{
      this.productoModel.imagen = res;
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
      this.catalogoService.addProducto(product, this.data.comercioId)
      .then((res)=>{
        this.loading = false;
          this.toastr.success('Producto añadido correctamente', '', {
            progressBar: true,
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
        })
        this.data.dialog.closeAll();
      })
    }
    else if(this.data.action === 'editar'){
      this.catalogoService.actualizarProducto(product)
      .then((res)=>{
        this.loading = false;
          this.toastr.success('Producto actualizado correctamente', '', {
            progressBar: true,
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
        })
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
          this.toastr.success('Producto Eliminado correctamente', '', {
            progressBar: true,
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
        })
          location.reload();
          this.data.dialog.closeAll();
        }
      })
    }
  }

  desactivarProducto(){
    this.catalogoService.desactivarProducto(this.productoModel)
    .subscribe((res)=>{
      this.loading = false;
        this.toastr.success('Producto desactivado correctamente', '', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-bottom-right'
      })
      location.reload();
      this.data.dialog.closeAll();
    })
  }
  activarProducto(){
    this.catalogoService.activarProducto(this.productoModel)
    .subscribe((res)=>{
      this.loading = false;
        this.toastr.success('Producto activado correctamente', '', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-bottom-right'
      })
      location.reload();
      this.data.dialog.closeAll();
    })
  }

}
