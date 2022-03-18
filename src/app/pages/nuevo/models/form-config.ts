import { FormlyFieldConfig } from "@ngx-formly/core"

export const formConfig = (): FormlyFieldConfig[] =>{
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
          type: 'select',
          className: 'field-form col-6',
          templateOptions: {
            label: 'Seleccione categoria',
            placeholder: '',
            options: [
              {
                label: 'Restaurante',
                value: 'restaurante',
              },
              {
                label: 'Café',
                value: 'cafe'
              },
            ]
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
          type: 'input',
          className: 'field-form col-6',
          templateOptions: {
            label: '% Descuento',
            placeholder: 'Ingrese descuento (sin %)',
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
