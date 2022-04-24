import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AccountService } from 'src/app/services/account.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { agregarProducto } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { NuevoComponent } from '../nuevo/nuevo.component';
import { ComercioService } from 'src/app/services/comercio.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposCategoriasEnum } from 'src/app/models/enums/tipo-categorias';

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
  categorias = []
  categoriasComercio: any[] = [ {
    id: -1,
    valor: 'todos',
    descripcion: 'Todos',
    icono: 'apps' ,
    activo: false,
  },];

  constructor(private comercioService: ComercioService, private categoriasService: CategoriasService, private catalogoService: CatalogoService, public dialog: MatDialog)
  {

  }

  ngOnInit(): void {
    this.categoriasService.getCategoriasPorTipo(TiposCategoriasEnum.PRODUCTOS).subscribe((res)=>{
      this.categorias = res;
    })
    this.comercioService.obtenerComercio()
    .subscribe((comercio)=>{
        this.comercioId = comercio._id;
        this.comercioService.actualizarInfoComercio(comercio)
        this.catalogoService.getProductos(comercio._id)
        .subscribe((productos)=>{
          this.productos = productos;
          this.productosContador = this.productos.length;
          this.title = `Catálogo (${this.productosContador})`;
          this.cargarCategorias();
          this.filtrar('Todos', 'todos')
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
          this.filtrar('Todos', 'todos')
        })
    })
  }

  async cargarCategorias(){
    await this.productos.map((producto)=>{
      if(this.categoriasComercio.filter((el)=> el?.descripcion === producto.categoria).length == 0){
        const categoriaElemento = this.categorias.find((cat)=> cat?.descripcion === producto.categoria);
        if(categoriaElemento){
          this.categoriasComercio.push(categoriaElemento);
        }
      }
    })
  }

  crearNuevo(){
    const openDialog = this.dialog.open(NuevoComponent, {
      id: 'Crear',
      width: '55%',
      data: {
        comercioId: this.comercioId,
        action: 'nuevo',
        dialog: this.dialog,
        refresh: this.refresh.bind(this)
      },
    });

    openDialog.afterClosed().subscribe((res)=>{
      this.refresh();
    })
  }

  viewProduct(producto){
    if(producto){
      const openDialog = this.dialog.open(NuevoComponent, {
        width: '55%',
        data: {
          action: 'editar',
          dialog: this.dialog,
          content: producto,
          refresh: this.refresh.bind(this)
        },
      });
      openDialog.afterClosed().subscribe((res)=>{
        this.refresh();
      })
    }
  }

  filtrar(descripcion, valor?: string){
    if(descripcion === 'Todos'){
      this.productosFiltrados = this.productos;
    }
    else{
      this.categorias.map((categoria)=>{
        if(categoria?.descripcion === descripcion){;
          this.productosFiltrados = this.productos.filter((producto)=> producto.categoria === valor)
        }
      })
    }
  }

}
