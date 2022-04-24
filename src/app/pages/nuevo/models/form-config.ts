import { FormlyFieldConfig } from "@ngx-formly/core"

export const formConfig = (categorias): FormlyFieldConfig[] =>{
  return [
    {
      className: 'col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'nombre',
          type: 'input',
          className: 'field-form col-6',

          templateOptions: {
            label: 'Título',
            placeholder: 'Ingrese título',
            required: true,
            maxLength: 50,
          },
        },
        {
          key: 'categoria',
          type: 'dropdown-input',
          className: 'field-form col-6',
          templateOptions: {
            label: 'Seleccione categoria',
            placeholder: '',
            options: categorias,
            attributes: {
              bindLabelOp: 'descripcion',
              bindValueOp: 'descripcion',
            }
          },
        },
      ]
    },
    {
      className: 'col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'precio',
          type: 'input',
          className: 'field-form col-6',
          templateOptions: {
            label: 'Precio (No separe miles)',
            placeholder: 'Ingrese el precio',
            required: true,
            type: 'number',

          }
        },
        {
          key: 'descuento',
          type: 'dropdown-input',
          className: 'field-form col-6',
          defaultValue: 0,
          templateOptions: {
            label: '% Descuento',
            attributes: {
              bindLabelOp: 'descripcion',
              bindValueOp: 'valor',
            },
            options: [
              {valor: 0, descripcion: 'Sin descuento'},
              {valor: 5, descripcion: '5%'},
              {valor: 10, descripcion: '10%'},
              {valor: 15, descripcion: '15%'},
              {valor: 20, descripcion: '20%'},
              {valor: 25, descripcion: '25%'},
              {valor: 50, descripcion: '50%'},
              {valor: 75, descripcion: '75%'},
            ]
          },
        },
      ]
    },
    {
      key: 'descripcion',
      type: 'textarea',
      className: 'field-form col-8',
      templateOptions: {
        label: 'Descripción',
        placeholder: 'Ingrese descripcion breve',
        required: true,
        rows: 3,
        maxLength: 100,
      }
    },
  ]
}
