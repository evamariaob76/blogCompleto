
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from './componentes/home/home.component';
import { ComercioComponent} from './componentes/comercio/comercio.component';
import { BuscadorComponent} from './componentes/buscador/buscador.component';
import { LinkComponent} from './componentes/link/link.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { ProtegidaComponent } from './componentes/protegida/protegida.component';
import { FormComponent } from './componentes/clientes/form.component';





//import { PageNotFoundComponent } from './';

const RUTAS: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'buscar/:termino', component: BuscadorComponent },
    { path: 'link/:posicion', component: LinkComponent },
    { path: 'comercios/:actividad', component: ActividadesComponent },
    { path: 'autenticacion', component: AutenticacionComponent },
    { path: 'protegida', component: ProtegidaComponent },
    { path: 'protegida', component: ProtegidaComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: 'clientes/form/:id', component: FormComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


export const APP_ROUTING = RouterModule.forRoot (RUTAS);

