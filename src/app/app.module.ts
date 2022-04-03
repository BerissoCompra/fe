import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductComponent } from './shared/product/product.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { FormlyFieldFile } from './shared/components/formly-field-file/formly-field-file.component';
import { FileValueAccessor } from './shared/components/formly-field-file/file-value-accessor';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { PedidoComponent } from './shared/pedido/pedido.component';
import { PedidoInfoComponent } from './pages/pedido-info/pedido-info.component';
import { RechazarPedidoComponent } from './pages/rechazar-pedido/rechazar-pedido.component';
import { HttpClientModule } from '@angular/common/http';

import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { ComercioService } from './services/comercio.service';
import { AccountService } from './services/account.service';
import { ProductPedidoComponent } from './shared/product-pedido/product-pedido.component';
import { CookieService } from 'ngx-cookie-service';
import { VerifyComponent } from './pages/verify/verify.component';
import { RegisterComponent } from './pages/login/components/register/register.component';
import { RecuperarClaveComponent } from './pages/login/components/recuperar-clave/recuperar-clave.component';
import { IniciarComponent } from './pages/login/components/iniciar/iniciar.component';
import { EstadisticaCardComponent } from './shared/components/estadistica-card/estadistica-card.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ButtonToggleComponent } from './shared/components/custom/button-toggle/button-toggle.component';
import { DropdownInputComponent } from './shared/components/custom/dropdown-input/dropdown-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import { CierreCajaComponent } from './pages/pedidos/cierre-caja/cierre-caja.component';
import { DatePipe } from '@angular/common';
import { TimeInputComponent } from './shared/components/custom/time-input/time-input.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    CatalogoComponent,
    PedidosComponent,
    ConfiguracionComponent,
    HeaderComponent,
    ProductComponent,
    NuevoComponent,
    FormlyFieldFile,
    DropdownInputComponent,
    FileValueAccessor,
    LoadingComponent,
    AlertComponent,
    PedidoComponent,
    PedidoInfoComponent,
    RechazarPedidoComponent,
    ProductPedidoComponent,
    VerifyComponent,
    RegisterComponent,
    RecuperarClaveComponent,
    IniciarComponent,
    EstadisticaCardComponent,
    ButtonToggleComponent,
    CierreCajaComponent,
    TimeInputComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
        { name: 'button-toggle', component: ButtonToggleComponent},
        { name: 'dropdown-input', component: DropdownInputComponent},
        { name: 'time-input', component: TimeInputComponent},
      ],
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    NgSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    ToastrModule.forRoot(),
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    ComercioService,
    AccountService,
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
