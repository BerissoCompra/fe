import { FormlyFieldConfig } from "@ngx-formly/core";

export const fieldsLogin: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Email',
      placeholder: 'Ingrese su email',
      required: true,
    },
  },
  {
    key: 'password',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Contraseña',
      placeholder: 'Ingrese su contraseña',
      required: true,
      type: 'password',

    }
  }
];

export const fieldsRegister: FormlyFieldConfig[] = [
  {
    template: `<p>Datos personales</p>`,
    className: 'header-form'
  },
  {
    key: 'nombre',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Nombres',
      placeholder: '',
      required: true,
    },
  },
  {
    key: 'apellido',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Apellidos',
      placeholder: '',
      required: true,
    },
  },
  {
    key: 'nombreElegido',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: '¿Como quieres que te llamemos? (Nombre elegido)',
      placeholder: '',
      required: false,
    },
  },
  {
    template: `<p>Datos de usuario</p>`,
    className: 'header-form'
  },
  {
    key: 'email',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Email',
      required: true,
    },
  },
  {
    key: 'password',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Contraseña',
      required: true,
      type: 'password',

    }
  },
  {
    key: 'repassword',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Repetir Contraseña',
      required: true,
      type: 'password',

    }
  },
];

export const fieldsComercio:  FormlyFieldConfig[] = [
    {
      template: `<p>Datos Comercio</p>`,
      className: 'header-form'
    },
    {
      key: 'nombre',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Nombre Comercio',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'direccion',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'Dirección',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'telefono',
      type: 'input',
      className: 'field-form',
      templateOptions: {
        label: 'WhatsApp de contacto',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'provincia',
      type: 'select',
      className: 'field-form',
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
      className: 'field-form',
      defaultValue: 'Berisso',
      templateOptions: {
        label: 'Ciudad',
        options: [{ label: 'Berisso', value: 'Berisso'}],
        placeholder: '',
        required: true,
      },
    },
]

export const fieldsEmail: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Email',
      placeholder: 'Ingrese su email',
      required: true,
    },
  },
];

export const fieldsCodigo: FormlyFieldConfig[] = [
  {
    key: 'codigo',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Ingrese Código de Verificación',
      placeholder: 'Código de Verificación',
      required: true,
    },
  },
];

export const nuevaPasswordFields: FormlyFieldConfig[] = [
  {
    key: 'password',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Contraseña',
      required: true,
      type: 'password',

    }
  },
  {
    key: 'repassword',
    type: 'input',
    className: 'field-form',
    templateOptions: {
      label: 'Repetir Contraseña',
      required: true,
      type: 'password',

    }
  },
];
