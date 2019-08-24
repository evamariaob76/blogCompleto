import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styles: []
})
export class ComercioComponent  {
  comercio: any = {};
  comercios: any = {};
  inicio: any = {};


  constructor(private activatedRoute: ActivatedRoute, 
              private comerciosService: ComerciosService,
              private router: Router) {

      this.activatedRoute.params.subscribe (params => {
      this.comercio = comerciosService.getComercio(params['id']);
      this.comercios = this.comerciosService.getComercios();

    });

  }

  comoLlegar(){
  let URL = window.location.pathname;
  console.log(URL.charAt(URL.length - 1));
  let posicion = URL.charAt(URL.length - 1);
  this.router.navigate(['/link', posicion]);

  }
  
  Inicio(){
  
    this.router.navigate(['/home']);
  
    }
}