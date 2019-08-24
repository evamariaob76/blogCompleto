import { Component,  } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent  {
  actividades: any = {};
  comercios: any = {};
 
      comercio: any = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private router : Router,
              private comerciosService :  ComerciosService,
              private menuLateralComponent : MenuLateralComponent
    ) {

      this.activatedRoute.params.subscribe (params => {
        this.comercios = comerciosService.buscarActividad(params['actividad']);
 
        //this.comercios = this.comerciosService.getComercios();
           console.log( this.comercios.length%2);
        
    
        });
        
      }
      verComercio(i:number){
        this.router.navigate(['/comercio', i]);
        console.log(i);
    
    
      }
    
  }

