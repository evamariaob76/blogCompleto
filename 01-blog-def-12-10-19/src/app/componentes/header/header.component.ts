import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ComerciosService } from '../../servicios/comercios.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  comercio: any = {};
  comercios: any = {};
  constructor(private activatedRoute: ActivatedRoute,
    private comerciosService : ComerciosService,
    private router : Router) { }

  ngOnInit() {

    $(document).ready(function() {
      $(".menu-icon").on("click", function() {
            $("nav ul").toggleClass("showing");
      });
});

// Scrolling Effect

$(window).on("scroll", function() {
      if($(window).scrollTop()) {
            $('nav').addClass('black');
      }

      else {
            $('nav').removeClass('black');
      }
})
}

Inicio(){
  this.router.navigate(['/home']);

  }
  Autenticarse(){
    this.router.navigate(['/clientes/form']);
  
    }
    cargarComercio():void{
      this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id){
        this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio))
      }
      })
    }

    findByName(nombre : string ): void {
      this.comerciosService.findByName(nombre).subscribe( params => {
        this.router.navigate(['/buscar', nombre]), console.log(this.comerciosService);

        
    })
    }

    verActividad(nombre:string){
      this.comerciosService.findByName(nombre).subscribe( params => {
  
        this.router.navigate(['/comercios', nombre]), console.log(this.comerciosService);
      console.log(nombre);
  
    //  this.router.navigate(['/comercios', actividad]);
    })
  }
}
