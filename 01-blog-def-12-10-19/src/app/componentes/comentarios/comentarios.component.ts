import { Component, OnInit, ViewChild,Input} from '@angular/core';
import { ComentariosService, Comentario } from '../../servicios/comentarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { NgForm, FormArray } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit  {
   comentario : Comentario = new Comentario();
   comentarios: any={};
   counter: number = 0;
   fechaHoy : Date = new Date();
   comercio : Comercio= new Comercio;
   comprobar: boolean = false;
   noExistenComentarios : boolean =true;
   comercios ; FormGroup;
   idComentario: any;
   id: any=0;
   contestacion: any;
   ver : boolean=false;
   coment: any;
   otravariable: boolean=true;
  myClass: boolean=false;
   constructor(
              private comentariosService : ComentariosService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private comerciosService: ComerciosService) { 


                
              }

  ngOnInit():void {
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'] ;
      this.comentario.id_comercio = id;
      this.comentario.fecha=this.fechaHoy;
      this.cargarComercio();
      this.cargarComercio();
      })
    }
 
  create(): void{
      // this.comentario.contestacion="";
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.comentariosService.create(this.comentario).subscribe
    (json => {
       this.comentario.nombre=json.comentario.nombre;
       /* this.comentario.fecha=json.comentario.fecha;
        this.comentario.id=json.comentario.id;
        this.idComentario= this.comentario.id;
        this.comentario.comentario=json.comentario.comentario;*/
       this.comentario.nombre="";
       this.comentario.email = "";
       this.comentario.comentario = "";

       this.cargarComercio();
       console.log(json.comentario.comentario)
    

  } ), swal.fire('Se ha guardado el comentario: ', 'success');
})
  }



  cargarComentario():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){    
      this.comentariosService.getComentarioComercio(id).subscribe(comentario => {
        
        this.comentario = comentario
        console.log(comentario)
        
        });

    }
    })
  }
  cargarComercio():void{
    this.activatedRoute.params.subscribe(params =>{
    // tslint:disable-next-line: prefer-const
    let id = params['id']
    if (id){
      this.comerciosService.getComercio(id).pipe(
          tap(response =>{
              let comercios = response as Comercio;
                           // console.log(comercios.comentarios.length)

              comercios.comentarios.forEach(comercio =>{//array para recorrer todos los comercios
                this.noExistenComentarios=false;
              });
    })
      ).subscribe((comercio => this.comercio = comercio)) 

    }   

    })
  }
  contestar(){
    document.getElementById("comment").style.paddingLeft='500px';
  }

  update(x): void{     
      this.activatedRoute.params.subscribe(params =>{//recojo de la url el número de comercio
    let id = params['id']  

    if ( x ){//si existe id, de esta forma gestiono errores   
       console.log(x)
       this.contestacion = (<HTMLInputElement>document.getElementById("contestacion"));

       this.comentario.id_comercio=id;
       this.comentario.id=x;
      this.comentario.contestacion=this.coment;
       this.comentariosService.update(this.comentario).subscribe(//me suscribo al servicio
         comentario => {

              //this.comentario = comentario, 
              this.cargarComercio()       

           
            } )        
       swal.fire(
            'se ha actualizado correctamente el comentario.',
            'success')
       }          


      });             this.comentario.contestacion = "eva"

    }
  eliminar(id): void {
    swal.fire({
      title: '¿Está seguro de que quiere eliminar esta comentario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.comentariosService.delete(id).subscribe
          (json => {
            /* this.comentario.fecha=json.comentario.fecha;
             this.comentario.id=json.comentario.id;
             this.idComentario= this.comentario.id;
             this.comentario.comentario=json.comentario.comentario;*/
            this.cargarComercio();


          }), swal.fire('Se ha eliminado el comentario: ', 'success');

      }
    })
  }
    
  mostrar(){
    switch (this.comprobar) {
      case true:
      this.comprobar=false;
      break;
      case false:
    this.comprobar=true;
    break;
    }
  }
cambiar(id) {

console.log('is cambiar es'+id);
document.getElementById("contestacion"+id).style.marginLeft = '150px';
 
if (document.getElementById("contestacion" + id).style.display = 'none'){
    document.getElementById("contestacion" + id).style.display = 'inline';

   } 
    else 
    document.getElementById("contestacion" + id).style.display = 'none'
 
if (document.getElementById("contestar" + id).style.display = 'inline'){
    document.getElementById("contestar" + id).style.display = 'none';


  }
  else
   document.getElementById("contestacion" + id).style.display = 'none';
  }
  cambiarAdmin(id){
    
    document.getElementById("contestacionAmin" + id).style.marginLeft = '150px';

    document.getElementById("contestacionAmin"+id).style.display = 'inline';



  }

cancelar(id){
  document.getElementById("contestacionAmin" + id).style.display = 'none';

}



  }
