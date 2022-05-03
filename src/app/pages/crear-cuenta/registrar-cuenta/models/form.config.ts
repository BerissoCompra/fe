import { FormlyFieldConfig } from "@ngx-formly/core";

export const fieldsGastronmico:  FormlyFieldConfig[] = [
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'nombre',
        type: 'input',
        className: 'field-form col-4',
        templateOptions: {
          label: 'Nombre Comercio',
          placeholder: '',
          required: true,
        },
      },
      {
        key: 'provincia',
        type: 'select',
        className: 'field-form col-4',
        defaultValue: 'Buenos Aires',
        templateOptions: {
          label: 'Provincia',
          placeholder: '',
          required: true,
          options: [{ label: 'Buenos Aires', value: 'Buenos Aires'}],
        },
      },
      {
        key: 'ciudad',
        type: 'select',
        className: 'field-form col-4',
        defaultValue: 'Berisso',
        templateOptions: {
          label: 'Ciudad',
          options: [{ label: 'Berisso', value: 'Berisso'}],
          placeholder: '',
          required: true,
        },
      },
    ]
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'direccion',
        type: 'input',
        className: 'field-form col-4',
        templateOptions: {
          label: 'Dirección',
          placeholder: '',
          required: true,
        },
      },
      {
        key: 'telefono',
        type: 'input',
        className: 'field-form col-4',
        templateOptions: {
          label: 'Whatsapp',
          placeholder: '',
          required: true,
        },
      },
    ]
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [

    ]
  },
]
