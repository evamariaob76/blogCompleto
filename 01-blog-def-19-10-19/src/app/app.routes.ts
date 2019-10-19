
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from './componentes/home/home.component';
import { ComercioComponent} from './componentes/comercio/comercio.component';
import { BuscadorComponent} from './componentes/buscador/buscador.component';
import { LinkComponent} from './componentes/link/link.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { FormComponent } from './componentes/clientes/form.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { UsuariosLoginComponent } from './componentes/usuarios-login/usuarios-login.component';
import { ComerciosLikesComponent } from './componentes/comercios-likes/comercios-likes.component';
import { NgForm } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { BodyComercioComponent } from './componentes/body-comercio/body-comercio.component';
import { GetComentariosComponent } from './componentes/get-comentarios/get-comentarios.component';
import { CrearComercioComponent } from './componentes/crear-comercio/crear-comercio.component';
import { SubirFotosComponent } from './componentes/subir-fotos/subir-fotos.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ComercioFechasComponent } from './componentes/comercio-fechas/comercio-fechas.component';
import { BioComponent } from './componentes/bio/bio.component';




const RUTAS: Routes = [
    { path: 'home', component: HomeComponent}, 
    { path: 'comercios/:id', component: BodyComercioComponent },
    { path: 'buscar/:nombre', component: BuscadorComponent },
    { path: 'link/:id', component: LinkComponent },
    { path: 'comercio/:nombre', component: ActividadesComponent },
    { path: 'autenticacion', component: AutenticacionComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard]},
    { path: 'clientes/page/:page', component: ClientesComponent, canActivate: [AuthGuard]},
    { path: 'likes', component: ComerciosLikesComponent },
    { path: 'comentarios/:id', component: GetComentariosComponent },
    { path: 'crear/comercios', component: CrearComercioComponent },
    { path: 'crear/comercios/:id', component: CrearComercioComponent},

    { path: 'crear/comercios/fotos/:id', component: SubirFotosComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'mes/:mes', component: ComercioFechasComponent },
    { path: 'bio', component: BioComponent },



    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


export const APP_ROUTING = RouterModule.forRoot (RUTAS);

