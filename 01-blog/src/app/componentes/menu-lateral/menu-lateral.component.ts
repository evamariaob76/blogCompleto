import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  comercios: any = [];
  comercio: any = [];

  constructor(private _comerciosService: ComerciosService, private router: Router) {

  }

  ngOnInit() {
    this.comercios = this._comerciosService.getComercios();

    $(document).ready(function(){
      $(" #imagendinamica").mouseover(function(){
        $(" #parrafo").css({"z-index":1});
        $(this).css({opacity:0.5,"z-index":-1});


      });
      $("  #imagendinamica").mouseout(function(){
        $(this).css({opacity:1,"z-index":1});
        $(" #parrafo").css({"z-index":-1});
      });
      $(" #parrafo").mouseover(function(){
        $(" #imagendinamica").css({opacity:0.5,"z-index":-1});
      });
  
    });

  }
  
  verActividad(actividad:string){
      let cosas:any = [];
  
    for(let comercio of this.comercios){
  
      if (comercio.actividad== actividad){
        this.router.navigate(['/comercios', actividad]);
      } 
   
    }
    return actividad;
  console.log(actividad)
  }
}