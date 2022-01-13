import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { NuevoComponent } from 'src/app/pages/nuevo/nuevo.component';
import { AccountService } from 'src/app/services/account.service';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() producto: Product;
  @Input() seccionCatalogo: boolean = false;

  defaultImage: string = 'data:image/png;base64,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';
  productoRuta: string[];

  constructor(private catalogoService: CatalogoService, private accountService: AccountService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  viewProduct(){
    if(this.seccionCatalogo){
      this.dialog.open(NuevoComponent, {
        data: {
          action: 'editar',
          dialog: this.dialog,
          content: this.producto,
        },
      });
    }
  }

  getDescuento(): number{
    let total = 0;
    const precio = this.producto.precio;
    const descuento = this.producto.descuento;
    total = precio - ((descuento * precio) / 100);
    return total;
  }

}
