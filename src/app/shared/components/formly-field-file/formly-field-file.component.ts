import { Component, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <input matNativeControl  type="file" [formControl]="formControl" [formlyAttributes]="field">
  `,
})
export class FormlyFieldFile extends FieldType {
}
