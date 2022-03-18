import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-button-toggle',
  template: `
  <div class="container">
    <label *ngIf="to?.label">{{to.label}}</label>
    <mat-button-toggle-group class="btn-group" [multiple]="true" [formlyAttributes]="field" [formControl]="formControl">
      <mat-button-toggle class="btn-toggle" *ngFor="let opt of to.options" [value]="getValor(opt)">{{getDescripcion(opt)}}</mat-button-toggle>
    </mat-button-toggle-group>
  </div>`,
  styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent extends FieldType {


  getValor(option){
    if(this.to['getValue']){
      return option[this.to['getValue']]
    }
    else{
      return option['valor'];
    }
  }

  getDescripcion(option){
    if(this.to['getDescripcion']){
      return option[this.to['getDescripcion']]
    }
    else{
      return option['descripcion'];
    }
  }


  onChange(ev){
    if(this.to.attributes && this.to.attributes['onChange']){
      this.to['parentComponent'].dropdownInputChange(ev);
    }
  }

}
