import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ComentariosService, Comentario } from '../../servicios/comentarios.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit  {
  comercio: any = {};
  comercios: Comercio[] = [];
  comentario: any = {};


  constructor(private activatedRoute: ActivatedRoute, 
              private comerciosService: ComerciosService,
              private comentariosService : ComentariosService,
              private router: Router,
              ) {

  }

  ngOnInit() {
    this.cargarComercio();//llamo a la función cargar comercio al cargar la página
    this.comerciosService.getComercios().subscribe(
      comercios => this.comercios = comercios.reverse()
     );
     this.cargarComentario();

     

    }


   Inicio(){//función que redirige a la página de inicio
    this.router.navigate(['/home']);
    }

  comoLlegar(){//función que redirige a la página link de cada uno de los comercios accediendo al id de la ruta
  let URL = window.location.pathname;
  console.log(URL.charAt(URL.length - 1));
  let posicion = URL.charAt(URL.length - 1);
  this.router.navigate(['/link', posicion]);
  }

  cargarComercio():void{//función que llama al servicio para cargar el comercio mediante id, accediento a través de parámetros de dirección url
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id){
        this.comerciosService.getComercio(id).subscribe(
        comercio => this.comercio = comercio);
        this.addVisitas(id);//cada vez que se cargue el comercio se llama a la función addVisitas para añadir al contador
      }      
    })
  }
  

    addVisitas(id: number): void {//llama al servicio y añado las visitas a cada uno de los comercios 
      this.comerciosService.addVisitas(id).subscribe( 
        comercio => this.comercio = comercio);
    }

    addLike(id: number): void {//llama al servicio y añado el like al comercio
      this.comerciosService.addLike(id).subscribe( json => {
        this.comercio.likes=json.likes;//se muestra en pantalla en tiempo real
      })
    }

   /* corazones(){//función que crea una animación para que cada vez que se haga click, el corazón cambie de color
      $('a').on('mouseover',function(){
        $('.fa-heart').on('click',function(){
          $(this).addClass("ver");   
        });  
      });  
       $('.fa-heart').delay(500).removeClass("ver");  //quita la clase añadida retrasando su ejecución 500 milisegundos
    }*/

    
   corazones(){//función que crea una animación para que cada vez que se haga click, el corazón cambie de color
    $('.fa-heart').click(function(){
   $('.fa-heart').css({
    'animation-duration': '3s',
    'animation-name': 'blur',
    'animation-iteration-count': '1'  
   });    
   
  });  

}
    cargarComentario():void{
      this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id){
        this.comentariosService.getComentarioComercio(id).subscribe((comentario => this.comentario = comentario));
  
      }
      })
    }


    findByName(nombre : string ): void {
      this.comerciosService.findByName(nombre).subscribe( params => {
        this.router.navigate(['/buscar', nombre]), console.log(this.comerciosService);

        
    })
    }
}