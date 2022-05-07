import { FormlyFieldConfig } from "@ngx-formly/core";

export const formConfig = (categorias): FormlyFieldConfig[] => {

  const optionsCheck = [
    {
      label: 'Si',
      value: true,
    },
    {
      label: 'No',
      value: false,
    }
  ]

  return ([
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<h1>Imágen / Logo<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'imagen',
          type: 'file-input',
          className: 'field-form col-6',
          templateOptions: {
            label: 'Imagen / Logo',
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'row',
      className: 'col-12',
      fieldGroup: [
        {
          template: `<h1>General<hr></h1>
            <p></p>
          `,
          className: 'col-12 mb-2 mt-5'
        },
        {
          key: 'nombreClasificado',
          type: 'input',
          className: 'field-form col-4',
          templateOptions: {
            label: 'Nombre',
            placeholder: 'Ingrese nombre de comercio',
            required: true,
            maxLength: 33,
          },
        },
        {
          key: 'categoria',
          type: 'dropdown-input',
          className: 'field-form col-4',
          templateOptions: {
            label: 'Seleccione categoría',
            options: categorias,
            attributes: {
              bindLabelOp: 'descripcion',
              bindValueOp: 'valor'
            }
          },
        },
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'descripcion',
          type: 'textarea',
          className: 'field-form col-8',
          templateOptions: {
            label: 'Descripción',
            placeholder: 'Ingrese una breve descripción...',
            rows: 4,
            required: true,
            maxLength: 150,
          },
        },
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<h1>Contacto y Redes<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'direccion',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'Dirección del negocio',
            placeholder: 'Ingrese una dirección si es que desea...',
            required: false,
          },
        },
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup:[
        {
          key: 'redes.facebook',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'URL Facebook',
            placeholder: 'https://facebook.com/...',
            required: true,
          },
        },
        {
          key: 'redes.instagram',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'URL Instagram',
            placeholder: 'https://instragram.com/...',
            required: true,
          },
        },
        {
          key: 'redes.wsp',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'WhatsApp',
            placeholder: '+54221...',
            required: true,
          },
        }
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'horarios',
          type: 'time-input',
          className: 'field-form col-4 mb-3',
          templateOptions: {
            label: 'Horarios de atención',
            required: false,
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'horario',
                className: 'field-form col-12',
                fieldGroupClassName: 'row',
                fieldGroup:[
                  {
                    key: 'desde',
                    type: 'input',
                    className: 'field-form col-6',
                    templateOptions: {
                      label: 'Desde',
                      type: 'time',
                      required: true,
                    },
                  },
                  {
                    key: 'hasta',
                    type: 'input',
                    className: 'field-form col-6',
                    templateOptions: {
                      label: 'Hasta',
                      type: 'time',
                      required: true,
                    },
                  },
                ]
              }
            ]
          }
        },
        {
          key: 'dias',
          type: 'button-toggle',
          className: 'field-form col-4',
          templateOptions:{
            label: 'Días abierto',
            getValue: 'valor',
            options: [
              {descripcion: 'Domingo', valor: 'Domingo'},
              {descripcion: 'Lunes', valor: 'Lunes'},
              {descripcion: 'Martes', valor: 'Martes'},
              {descripcion: 'Miércoles', valor: 'Miercoles'},
              {descripcion: 'Jueves', valor: 'Jueves'},
              {descripcion: 'Viernes', valor: 'Viernes'},
              {descripcion: 'Sábado', valor: 'Sabado'},
            ]
          }
        }
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<h1>Ubicación<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'ubicacion',
          type: 'map-input',
          className: 'field-form col-12',
          templateOptions: {
            change:(field, ubicacion) =>{
              field.formControl.setValue(ubicacion);
            },
            label: 'Latitud',
            required: true,
          },
        },
      ]
    }
  ])
}

