import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
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
import { FinalizadosComponent } from './pages/finalizados/finalizados.component';
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
import { CursoComponent } from './pages/curso/curso.component';
import { RechazarPedidoComponent } from './pages/rechazar-pedido/rechazar-pedido.component';
import { HttpClientModule } from '@angular/common/http';

import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { ComercioService } from './services/comercio.service';
import { AccountService } from './services/account.service';
import { ProductPedidoComponent } from './shared/product-pedido/product-pedido.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    CatalogoComponent,
    PedidosComponent,
    FinalizadosComponent,
    ConfiguracionComponent,
    HeaderComponent,
    ProductComponent,
    NuevoComponent,
    FormlyFieldFile,
    FileValueAccessor,
    LoadingComponent,
    AlertComponent,
    PedidoComponent,
    PedidoInfoComponent,
    CursoComponent,
    RechazarPedidoComponent,
    ProductPedidoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
      ],
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    ComercioService,
    AccountService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
