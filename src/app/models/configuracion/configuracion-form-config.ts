import { FormlyFieldConfig } from "@ngx-formly/core";

export const ConfiguracionNegocioFormConfig = (categorias): FormlyFieldConfig[] => {

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
      fieldGroupClassName: 'row',
      className: 'col-12',
      fieldGroup: [
        {
          template: `<h1>General<hr></h1>
            <p></p>
          `,
          className: 'col-12 mb-2'
        },
        {
          key: 'nombre',
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
              bindValueOp: 'descripcion'
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
            placeholder: 'Ingrese una breve descripción del negocio',
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
          template: `<h1>Envíos<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'tipoEnvio',
          type: 'select',
          className: 'field-form col-4',
          templateOptions: {
            label: 'Tipo de envío',
            required: true,
            options: [
              {label: 'Seleccione opción',},
              {label: 'Envío gratis', value: 'gratis'},
              {label: 'Envío pago', value: 'pago'},
              {label: 'No realiza envios', value: 'no'},
            ]
          },
        },
        {
          key: 'costoEnvio',
          type: 'input',
          className: 'field-form col-4',
          hideExpression: (model) =>{
            return model.tipoEnvio != 'pago';
          },
          templateOptions: {
            label: 'Costo del envío',
            placeholder: 'Ingrese precio de envio',
            type: 'number',
            required: true,
          },
        },
        {
          key: 'retiro',
          type: 'select',
          defaultValue: false,
          className: 'field-form col-4',
          templateOptions: {
            label: 'Cuenta con Take - Away?',
            options: optionsCheck
          },
        },
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<h1>Contacto<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'direccion',
          type: 'input',
          className: 'field-form col-4',
          templateOptions: {
            label: 'Dirección del negocio',
            placeholder: 'Ingrese dirección del negocio',
            required: true,
          },
        },
        {
          key: 'telefono',
          type: 'input',
          className: 'field-form col-4',
          templateOptions: {
            label: 'WhatsApp de contacto (Sin +)',
            placeholder: 'Ejemplo (542210000000)',
            required: true,
          },
        },
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
            required: true,
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
          template: `<h1>Pagos<hr></h1>`,
          className: 'col-12 mt-5'
        },
        {
          key: 'pagoDigital',
          type: 'select',
          defaultValue: false,
          className: 'field-form col-4',
          templateOptions: {
            label: 'Pago digital',
            options: optionsCheck
          },
        },
      ]
    },
    {
      className: 'field-form col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<h1>Cuenta digital<p class="aclaracion">¿Que hacemos con esta información? Debido a que CiudadApp NO interviene en los pagos digitales, lo que harémos es que el usuario (cliente) antes de realizar su pago pueda visualizar los datos de la cuenta a quien le deba enviar el dinero. </p></h1>`,
          className: 'col-12 mt-5',
          hideExpression: (model)=>{
            return !model.pagoDigital
          },
        },
        {
          key: 'cuenta.alias',
          type: 'input',
          className: 'field-form col-2',
          hideExpression: (model)=>{
            return !model.pagoDigital
          },
          templateOptions: {
            label: 'Alias',
            placeholder: 'Ingrese Alias',
          },
        },
        {
          key: 'cuenta.cvu',
          type: 'input',
          className: 'field-form col-3',
          hideExpression: (model)=>{
            return !model.pagoDigital
          },
          templateOptions: {
            label: 'CVU/CBU',
            placeholder: 'Ingrese CVU/CBU',
          },
        },
        {
          key: 'cuenta.banco',
          type: 'input',
          className: 'field-form col-3',
          hideExpression: (model)=>{
            return !model.pagoDigital
          },
          templateOptions: {
            label: 'Banco',
            placeholder: 'Ingrese Banco',
          },
        },
        {
          key: 'cuenta.nombreApellido',
          type: 'input',
          className: 'field-form col-4',
          hideExpression: (model)=>{
            return !model.pagoDigital
          },
          templateOptions: {
            label: 'Nombre y Apellido',
            placeholder: 'Ingrese nombre y apellido',
          },
        },
      ]
    },
  ])
}

