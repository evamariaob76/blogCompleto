import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';






//Rutas
import { APP_ROUTING } from './app.routes';


//servicios
import { ComerciosService } from './servicios/comercios.service';
import { googleService } from './servicios/googlemaps.service';
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
import { ProtegidaComponent } from './componentes/protegida/protegida.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { FormComponent } from './componentes/clientes/form.component';


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
    ProtegidaComponent,
    ClientesComponent,
    FormComponent

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo3-Ge_42mC3dm77XpBK748aAgn7lKZNw'
    })
  ],
  providers: [      
    ComerciosService,
    googleService,
    MenuLateralComponent,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
