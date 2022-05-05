import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TokenGuard } from './guards/token.guard';
import { RolesEnum } from './models/enums/roles';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ConfiguracionServiciosComponent } from './pages/configuracion-servicios/configuracion-servicios.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RegistrarCuentaComponent } from './pages/crear-cuenta/registrar-cuenta/registrar-cuenta.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { IniciarComponent } from './pages/login/components/iniciar/iniciar.component';
import { RecuperarClaveComponent } from './pages/login/components/recuperar-clave/recuperar-clave.component';
import { RegisterComponent } from './pages/login/components/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ServiciosAppComponent } from './pages/servicios-app/servicios-app.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', component: IniciarComponent },
      { path: 'registrar', component: RegisterComponent },
      { path: 'actualizarclave', component: RecuperarClaveComponent },
    ]
  },
  {
    path: 'servicios',
    canActivate: [TokenGuard],
    component: ServiciosAppComponent,
    children: [
      { path: '', component: CrearCuentaComponent},
      { path: ':comercio', component: RegistrarCuentaComponent},
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', canActivate: [AuthGuard], data: {rol: RolesEnum.USUARIO, redirect: 'dashboard'} ,component: HomeComponent},
      { path: 'catalogo', canActivate: [AuthGuard], data: {rol: RolesEnum.USUARIO, redirect: 'dashboard'} ,component: CatalogoComponent},
      { path: 'nuevo', canActivate: [AuthGuard], data: {rol: RolesEnum.USUARIO, redirect: 'dashboard'} ,component: NuevoComponent},
      { path: 'configuracion', canActivate: [AuthGuard], data: {rol: RolesEnum.USUARIO, redirect: 'dashboard'} ,component: ConfiguracionComponent},
      { path: 'configuracion-servicio', canActivate: [AuthGuard], data: {rol: RolesEnum.SERVICIO, redirect: 'dashboard'} ,component: ConfiguracionServiciosComponent},
      { path: ':pedido', canActivate: [AuthGuard], data: {rol: RolesEnum.USUARIO, redirect: 'dashboard'} ,component: PedidosComponent},
      // { path: 'finalizados', component: PedidosComponent },
      // { path: 'enviados', component: PedidosComponent },
    ]
  },
  { path: 'accountverify/:usuarioId', component: VerifyComponent },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
