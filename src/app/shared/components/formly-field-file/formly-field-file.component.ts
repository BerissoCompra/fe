import { Component, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <input type="file">
  `,
})
export class FormlyFieldFile extends FieldType {
}
