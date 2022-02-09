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
      label: 'Nombres elegidos',
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
