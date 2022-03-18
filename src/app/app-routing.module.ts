import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { IniciarComponent } from './pages/login/components/iniciar/iniciar.component';
import { RecuperarClaveComponent } from './pages/login/components/recuperar-clave/recuperar-clave.component';
import { RegisterComponent } from './pages/login/components/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: HomeComponent},
      { path: 'catalogo', component: CatalogoComponent},
      { path: 'nuevo', component: NuevoComponent},
      { path: 'configuracion', component: ConfiguracionComponent},
      { path: ':pedido', component: PedidosComponent},
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
