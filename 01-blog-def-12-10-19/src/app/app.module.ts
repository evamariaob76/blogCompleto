import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { IgxPieChartModule } from "igniteui-angular-charts/ES5/igx-pie-chart-module";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';  
registerLocaleData(localeEs, 'es');





//Rutas
import { APP_ROUTING } from './app.routes';


//servicios
import { ComerciosService } from './servicios/comercios.service';
import { ClienteService } from './servicios/cliente.service';




//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './componentes/body/body.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { HomeComponent } from './componentes/home/home.component';
import { ComercioComponent } from './componentes/comercio/comercio.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LinkComponent} from './componentes/link/link.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { FormComponent } from './componentes/clientes/form.component';
import { ComerciosLikesComponent } from './componentes/comercios-likes/comercios-likes.component';
import { PaginatorComponent } from './componentes/paginator/paginator.component';
import { UsuariosLoginComponent } from './componentes/usuarios-login/usuarios-login.component';
import { MenuDinamicoComponent } from './componentes/menu-dinamico/menu-dinamico.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ComentariosComponent } from './componentes/comentarios/comentarios.component';
import { BodyComercioComponent } from './componentes/body-comercio/body-comercio.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { GetComentariosComponent } from './componentes/get-comentarios/get-comentarios.component';
import { CrearComercioComponent } from './componentes/crear-comercio/crear-comercio.component';
import { SubirFotosComponent } from './componentes/subir-fotos/subir-fotos.component';
import { AdminComponent } from './componentes/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ComercioComponent,
    BuscadorComponent,
    LinkComponent,
    MenuLateralComponent,
    ActividadesComponent,
    AutenticacionComponent,
    ClientesComponent,
    FormComponent,
    ComerciosLikesComponent,
    PaginatorComponent,
    UsuariosLoginComponent,
    MenuDinamicoComponent,
    HeaderComponent,
    ComentariosComponent,
    BodyComercioComponent,
    CalendarioComponent,
    GetComentariosComponent,
    CrearComercioComponent,
    SubirFotosComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    IgxPieChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo3-Ge_42mC3dm77XpBK748aAgn7lKZNw'
    })
  ],
  providers: [      
    ComerciosService,
    MenuLateralComponent,
    ClienteService,
    {provide : LOCALE_ID, useValue: 'es-ES'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
