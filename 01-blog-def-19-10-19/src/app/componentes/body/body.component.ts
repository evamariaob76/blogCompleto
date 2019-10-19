import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ComentariosService, Comentario } from '../../servicios/comentarios.service';

import swal from 'sweetalert2';
import { NumberFormatStyle } from '@angular/common';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnChanges {
  comercios: Comercio[] = [];
  comercio : Comercio;
  comentarios: {};

  
  constructor(private comerciosService: ComerciosService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private comentariosService : ComentariosService,

              ) { }

  ngOnInit() {
    this.cargarComercio();
    this.comerciosService.getComercios().subscribe(
      comercios => this.comercios = comercios.reverse()
     );
  

}
 ngOnChanges(){

}
corazones(){//función que crea una animación para que cada vez que se haga click, el corazón cambie de color
  $('a').on('mouseover',function(){

    $('.fa-heart').on('click',function(){
      $(this).addClass("ver");   

    });  
  });  
   $('.fa-heart').delay(500).removeClass("ver");  //quita la clase añadida retrasando su ejecución 500 milisegundos



}
sombreado(){//función mediante la cual los sombreados de las cajas de los comercios cambian al ponerse encima
  $(document).ready(function(){
    $(".sombras").hover(function(){
      $(this).css({
      "box-shadow": "10px 10px 50px #666",
       "transition": "box-shadow 0.7s ease-in-out"
      });
      }, function(){
        $(this).css("box-shadow", "none");
      });
  });
 }

  cargarComercio():void{//llama a ComerciosService para cargar todos los comercios en pantalla
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio));
      console.log(this.comercio);

    }
    })
  }
  /*create(): void{
    // console.log("click");
    // console.log(this.cliente);
     this.comerciosService.create(this.comercio).subscribe
       (json => {
       this.router.navigate(['/autenticacion'])
       swal.fire('Se ha guardado el comercio: ', `${json.mensaje} : ${json.comercio.nombre}`, 'success');
     
     })
   }*/



addLike(id: number): void {
  
  this.comerciosService.addLike(id).subscribe( json => {
    for (let comercio of this.comercios){
      if(comercio.id==id){
        comercio.likes=json.likes;
        break;
      }
    }
})
}







}


