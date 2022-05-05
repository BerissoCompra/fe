import { RolesEnum } from "src/app/models/enums/roles";

export const sidebarItems = [
  {
    nombre: 'Inicio',
    redirect: 'inicio',
    icon: 'auto_graph',
    roles: [RolesEnum.USUARIO]
  },
  {
    nombre: 'Catálogo',
    redirect: 'catalogo',
    icon: 'view_quilt',
    roles: [RolesEnum.USUARIO]
  },
  {
    nombre: 'Pedidos',
    redirect: 'pedidos',
    icon: 'receipt_long',
    roles: [RolesEnum.USUARIO]
  },
  {
    nombre: 'Configuración',
    redirect: 'configuracion',
    icon: 'settings',
    roles: [RolesEnum.USUARIO]
  },
  {
    nombre: 'Configuración',
    redirect: 'configuracion-servicio',
    icon: 'settings',
    roles: [RolesEnum.SERVICIO]
  },
]
