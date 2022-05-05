import { FormlyFieldConfig } from '@ngx-formly/core';

export const fieldsGastronmico: FormlyFieldConfig[] = [
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
          options: [{ label: 'Buenos Aires', value: 'Buenos Aires' }],
        },
      },
      {
        key: 'ciudad',
        type: 'select',
        className: 'field-form col-4',
        defaultValue: 'Berisso',
        templateOptions: {
          label: 'Ciudad',
          options: [{ label: 'Berisso', value: 'Berisso' }],
          placeholder: '',
          required: true,
        },
      },
    ],
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
    ],
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [],
  },
];

export const fieldsProfesionales: FormlyFieldConfig[] = [
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'nombre',
        type: 'input',
        className: 'field-form col-3',
        templateOptions: {
          label: 'Nombre Comercio',
          placeholder: '',
          required: true,
        },
      },
      {
        key: 'provincia',
        type: 'select',
        className: 'field-form col-3',
        defaultValue: 'Buenos Aires',
        templateOptions: {
          label: 'Provincia',
          placeholder: '',
          required: true,
          options: [{ label: 'Buenos Aires', value: 'Buenos Aires' }],
        },
      },
      {
        key: 'ciudad',
        type: 'select',
        className: 'field-form col-3',
        defaultValue: 'Berisso',
        templateOptions: {
          label: 'Ciudad',
          options: [{ label: 'Berisso', value: 'Berisso' }],
          placeholder: '',
          required: true,
        },
      },
    ],
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'direccion',
        type: 'input',
        className: 'field-form col-3',
        templateOptions: {
          label: 'Dirección',
          placeholder: '',
          required: true,
        },
      },
      {
        key: 'telefono',
        type: 'input',
        className: 'field-form col-3',
        templateOptions: {
          label: 'Whatsapp',
          placeholder: '',
          required: true,
        },
      },
    ],
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [],
  },
];

export const fieldsComercio: FormlyFieldConfig[] = [
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
          options: [{ label: 'Buenos Aires', value: 'Buenos Aires' }],
        },
      },
      {
        key: 'ciudad',
        type: 'select',
        className: 'field-form col-4',
        defaultValue: 'Berisso',
        templateOptions: {
          label: 'Ciudad',
          options: [{ label: 'Berisso', value: 'Berisso' }],
          placeholder: '',
          required: true,
        },
      },
    ],
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
    ],
  },
  {
    key: '',
    className: 'col-12',
    fieldGroupClassName: 'row',
    fieldGroup: [],
  },
];

export const fieldsClasificados = (): FormlyFieldConfig[] => {
  return [
    {
      key: '',
      className: 'col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'nombreClasificado',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'Nombre del Servicio',
            placeholder: '',
            required: true,
          },
        },
        {
          key: 'nombreResponsable',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'Nombre y apellidos del responsable',
            placeholder: '',
            required: true,
          },
        },
        {
          key: 'contacto',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'Celular',
            placeholder: '',
            required: true,
          },
        },
        {
          key: 'direccion',
          type: 'input',
          className: 'field-form col-3',
          templateOptions: {
            label: 'Dirección',
            placeholder: '',
            required: true,
          },
        },
        // {
        //   key: 'categoria',
        //   type: 'dropdown-input',
        //   className: 'field-form col-3',
        //   templateOptions: {
        //     label: 'Categoría',
        //     required: true,
        //     options: categorias,
        //     attributes: {
        //       bindValueOp:  'descripcion',
        //       bindLabelOp: 'descripcion',
        //     }
        //   },
        // },
      ],
    },
    // {
    //   key: '',
    //   className: 'col-12',
    //   fieldGroupClassName: 'row',
    //   fieldGroup: [
    //     {
    //       key: 'descripcion',
    //       type: 'textarea',
    //       className: 'field-form col-12',
    //       templateOptions: {
    //         label: 'Descripcion',
    //         placeholder: '',
    //         required: true,
    //       },
    //     },
    //   ],
    // },
    {
      key: '',
      className: 'col-12',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          template: `<p class="mt-3">Información para tus clientes</p>`
        },
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
            label: 'Nro de WhatsApp',
            placeholder: '+54221...',
            required: true,
          },
        },
      ],
    },
    // {
    //   key: '',
    //   className: 'col-12',
    //   fieldGroupClassName: 'row',
    //   fieldGroup: [
    //     {
    //       key: 'imagen',
    //       type: 'file',
    //       className: 'field-form col-6',
    //       templateOptions: {
    //         label: 'Logotipo | Imágen',
    //         placeholder: '',
    //         required: true,
    //       },
    //     },
    //   ],
    // },
  ];
};
