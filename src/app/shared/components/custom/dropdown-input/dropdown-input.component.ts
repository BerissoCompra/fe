import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  styleUrls: ['./dropdown-input.component.scss'],
  template: `
    <div>
      <label class="mb-2">{{to?.label}}</label>
      <ng-select
        [id]="key"
        appearance="outline"
        class="ng-select"
        [ngClass]="{
          'is-invalid': field.formControl.invalid && field.formControl.touched
        }"
        [clearable]="clearable"
        [searchable]="searchable"
        [multiple]="multiple"
        [formControl]="formControl"
        [bindValue]="bindValueOp"
        [bindLabel]="bindLabelOp"
        [items]="to.options"
        [placeholder]="placeholder"
        [formlyAttributes]="field"
        [dropdownPosition]="dropdownPosition"
        [readonly]="disabled"
      >
      </ng-select>
    </div>
  `,
})
export class DropdownInputComponent extends FieldType implements OnInit {
  required = false;
  bindValueOp: string | number;
  bindLabelOp: string | number;
  clearable: string | number | boolean;
  searchable: string | number | boolean;
  multiple: string | number | boolean;
  label: string | number;
  placeholder: string;
  dropdownPosition: string | number;
  disabled: boolean = false;

  ngOnInit(): void {
    this.setAttributes();
// if (this.disabled){
    //   this.field.formControl.disable();
    //   this.formControl.disable();
    //   this.form.disable();
    // }
  }

  setAttributes(): void {
    this.bindValueOp = this.to.attributes
      ? this.to.attributes['bindValueOp']
      : 'id';
    this.bindLabelOp = this.to.attributes
      ? this.to.attributes['bindLabelOp']
      : 'valor';
    this.clearable = this.to.attributes ? this.to.attributes['clearable'] : false;
    this.searchable = this.to.attributes
      ? this.to.attributes['searchable']
      : false;
    this.multiple = this.to.attributes ? this.to.attributes['multiple'] : false;
    this.label = this.to.label;
    this.placeholder = this.to.placeholder
      ? this.to.placeholder
      : 'Seleccionar';
    this.required = this.to.required ? this.to.required : false;
    this.dropdownPosition = this.to.attributes
      ? this.to.attributes['dropdownPosition']
      : 'bottom';
    // this.disabled = this.to.disabled ? this.to.disabled : false;
  }
}
