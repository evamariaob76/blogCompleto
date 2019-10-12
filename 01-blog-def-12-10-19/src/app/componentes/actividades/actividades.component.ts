import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent  implements OnInit {
  comercios : Comercio[]=[];
 
      comercio: any = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private router : Router,
              private comerciosService :  ComerciosService,
              private menuLateralComponent : MenuLateralComponent
                ) {}
        
            ngOnInit() {
            this.activatedRoute.params.subscribe(params =>{
            let nombre = params['nombre']
            if (nombre){
               this.comerciosService.findByName(nombre).subscribe((comercios => this.comercios = comercios))
              }
            })
              
              }
      verComercio(i:number){
        this.router.navigate(['/comercio', i]);
        console.log(i);
    
    
      }
    
  }

