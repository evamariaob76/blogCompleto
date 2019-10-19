import { Component, OnInit } from '@angular/core';
import { Comentario, ComentariosService } from '../../servicios/comentarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';


@Component({
  selector: 'app-get-comentarios',
  templateUrl: './get-comentarios.component.html',
  styleUrls: ['./get-comentarios.component.css']
})
export class GetComentariosComponent implements OnInit {
  comentarios: Comentario[] =[];
  comentario: Comentario;
  comercio: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private comentariosService : ComentariosService,
    private comerciosService: ComerciosService
    
  ) {      
    this.activatedRoute.params.subscribe (params => {
      this.comercio = comerciosService.getComercio(params['id']);

    });

  }


  ngOnInit() {
    this.cargarComentario();
    this.cargarComercio();






   
    }
  cargarComentario():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comentariosService.getComentarioComercio(id).subscribe((comentario => this.comentario = comentario));

    }
    })
  }

  
  cargarComercio():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio));
      console.log(this.comercio);

    }
    })
  }
}
