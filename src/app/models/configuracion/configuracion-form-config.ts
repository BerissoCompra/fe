import { FormlyFieldConfig } from "@ngx-formly/core";

export const ConfiguracionNegocioFormConfig = (): FormlyFieldConfig[] => {
  return ([
    {
      key: 'nombre',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Nombre',
        placeholder: 'Ingrese nombre de comercio',
        required: true,
      },
    },
    {
      key: 'descripcion',
      type: 'textarea',
      className: 'field-form',
      templateOptions: {
        label: 'Descripción',
        placeholder: 'Ingrese una breve descripción del negocio',
        rows: 9,
        required: true,
      },
    },
    {
      key: 'categoria',
      type: 'select',
      className: 'field-form',
      templateOptions: {
        label: 'Seleccione categoría',
        placeholder: '',
        options: [
          {
            label: 'Seleccione categoría',
          },
          {
            label: 'Restaurante',
            value: 'restaurante',
          },
          {
            label: 'Café',
            value: 'cafe'
          },
          {
            label: 'Bebidas',
            value: 'bebidas'
          },
          {
            label: 'Flores',
            value: 'flores'
          },
          {
            label: 'Mercado',
            value: 'mercado'
          },
          {
            label: 'Tienda',
            value: 'tienda'
          },
          {
            label:  'Kiosco',
            value: 'kiosco'
          },
          {
            label: 'Mascotas',
            value: 'mascotas'
          },
          {
            label: 'Farmacia',
            value: 'farmacia'
          },
        ]
      },
    },
    {
      key: 'tipoEnvio',
      type: 'select',
      className: 'field-form',
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
      className: 'field-form',
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
      type: 'checkbox',
      defaultValue: 0,
      className: 'field-form',
      templateOptions: {
        label: 'Activar retiros de productos en mi dirección',

      },
    },
    {
      key: 'direccion',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Dirección del negocio',
        placeholder: 'Ingrese dirección del negocio',
        required: true,
      },
    },
    {
      key: 'telefono',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Teléfono de contacto',
        placeholder: 'Ejemplo (+542210000000)',
        required: true,
      },
    },
    {
      key: 'horarios',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Horario de atención',
        placeholder: 'Ejemplo: (10:00 a 18:00)',
        required: true,
      },
    },
    {
      key: 'pagoEfectivo',
      type: 'checkbox',
      defaultValue: 0,
      className: 'field-form',
      templateOptions: {
        label: 'Acepta pago efectivo',

      },
    },
    {
      key: 'pagoDigital',
      type: 'checkbox',
      defaultValue: 0,
      className: 'field-form',
      templateOptions: {
        label: 'Acepta pago digital',
      },
    },
    {
      key: 'cuenta.alias',
      type: 'input',
      className: 'field-form',
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
      className: 'field-form',
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
      className: 'field-form',
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
      className: 'field-form',
      hideExpression: (model)=>{
        return !model.pagoDigital
      },
      templateOptions: {
        label: 'Nombre y Apellido',
        placeholder: 'Ingrese nombre y apellido',
      },
    },
  ])
}

