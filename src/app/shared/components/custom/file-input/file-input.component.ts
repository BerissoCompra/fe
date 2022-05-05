import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-file-input',
  template: `
    <div>
      <p><label>{{to?.label}} <span>{{to?.required ? '*' : ''}}</span></label></p>
      <input  class="form-control" [formControl]="formControl" type="file">
    </div>
  `,
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends FieldType implements OnInit {

  ngOnInit(): void {
  }

}
