import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AccountService } from 'src/app/services/account.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { agregarProducto } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { NuevoComponent } from '../nuevo/nuevo.component';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  productos: Product[];
  productosFiltrados: Product[];
  productosContador: number = 0;
  title: string = `Catálogo (${this.productosContador})`;
  comercioId: string;

  categorias = [
    {
      id: 0,
      valor: 'cafe',
      descripcion: 'Café',
      icono: 'local_cafe' ,
      activo: false,
    },
    {
      id: 1,
      valor: 'restaurante',
      descripcion: 'Restaurante',
      icono: 'restaurant' ,
      activo: false,
    },
    {
      id: 2,
      valor: 'bebidas',
      descripcion: 'Bebidas',
      icono: 'local_bar' ,
      activo: false,
    },
    {
      id: 3,
      descripcion: 'Restaurante',
      valor: 'restaurante',
      icono: 'restaurant' ,
      activo: false,
    },
    {
      id: 4,
      descripcion: 'Kiosco',
      valor: 'kiosco',
      icono: 'storefront' ,
      activo: false,
    },
  ]

  categoriasComercio: any[] = [ {
    id: -1,
    valor: 'todos',
    descripcion: 'Todos',
    icono: 'apps' ,
    activo: false,
  },];

  constructor(private comercioService: ComercioService, private catalogoService: CatalogoService, public dialog: MatDialog)
  {

  }

  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((comercio)=>{
        this.comercioId = comercio._id;
        this.catalogoService.getProductos(comercio._id)
        .subscribe((productos)=>{
          this.productos = productos;
          this.productosContador = this.productos.length;
          this.title = `Catálogo (${this.productosContador})`;
          this.cargarCategorias();
          this.filtrar(-1, 'todos')
        })
    })
  }

  refresh(){
    this.comercioService.obtenerComercio()
    .subscribe((comercio)=>{
        this.comercioId = comercio._id;
        this.catalogoService.getProductos(comercio._id)
        .subscribe((productos)=>{
          this.productos = productos;
          this.productosContador = this.productos.length;
          this.title = `Catálogo (${this.productosContador})`;
          this.cargarCategorias();
          this.filtrar(-1, 'todos')
        })
    })
  }

  async cargarCategorias(){
    await this.productos.map((producto)=>{
      if(this.categoriasComercio.filter((el)=> el.valor === producto.categoria).length == 0){
        const categoriaElemento = this.categorias.find((cat)=> cat.valor === producto.categoria);
        this.categoriasComercio.push(categoriaElemento);
      }
    })
  }

  crearNuevo(){
    const openDialog = this.dialog.open(NuevoComponent, {
      id: 'Crear',
      data: {
        comercioId: this.comercioId,
        action: 'nuevo',
        dialog: this.dialog,
        class: this,
      },
    });

    openDialog.afterClosed().subscribe((res)=>{
        this.refresh();
    })
  }

  filtrar(id: number, valor?: string){
    if(id === -1){
      this.productosFiltrados = this.productos;
      return;
    }
    this.categorias.map((categoria)=>{
      if(categoria.id === id){
        categoria.activo = true;
        this.productosFiltrados = this.productos.filter((producto)=> producto.categoria === valor)
      }
      else{
        categoria.activo = false;
      }
    })
  }

}
