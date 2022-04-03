import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-time-input',
  template: `
    <div>
      <div class="header">
        <label class="mb-3">{{to?.label}}</label>
        <div (click)="add()" class="mb-2 button-action green"><mat-icon class="material-icons-outlined" matTooltip="Agregar Horario">add</mat-icon></div>
      </div>
      <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
        <div class="contenedor-field">
          <formly-field class="col" [field]="field"></formly-field>
          <div (click)="remove(i)" class=" button-action red"><mat-icon class="material-icons-outlined" matTooltip="Eliminar Horario">delete</mat-icon></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent extends FieldArrayType implements OnInit {
  ngOnInit(): void {
  }

}
