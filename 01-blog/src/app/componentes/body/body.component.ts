import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jQuery from 'jquery';
import { ComerciosLikesService } from '../../servicios/comercios-likes.service';
import { ComercioLikes } from '../comercios-likes/comercio.likes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  comercios: Comercio[] = [];
  comerciosLike: ComercioLikes[]=[]
  comercio: ComercioLikes = new ComercioLikes();

  private comercioLikes: ComercioLikes= new ComercioLikes();
  constructor(private _comerciosService: ComerciosService, 
              private router: Router, 
              private comerciosLikeService : ComerciosLikesService,
              private activatedRoute: ActivatedRoute
              ) {
                

  }

  ngOnInit() {
    this.cargarCliente();
    this.comercios = this._comerciosService.getComercios();
 
  


  }

  verComercio(i: number){
    this.router.navigate(['/comercio', i]);
    console.log(i);

      }
  addLike(id: number): void {
/*    this.comercioLikes.likes=this._comerciosService.verLikes(i);
    this.comercioLikes.nombre = this._comerciosService.getComercioNombre(i);
    this.comercioLikes.id = this._comerciosService.getComercioId(i);
*/

    this.comerciosLikeService.addLike(id).subscribe(
      (comercioUpdated: Comercio) => {
        this.comercios.forEach( comercio => {
          if (comercio.id === id) {
            comercio.likes = comercioUpdated.likes;
          }
        });
      }
    );
  }
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comerciosLikeService.getComercioLike(id).subscribe((comercio => this.comercio = comercio))
    }
    })
  }
 /* create(i:number): void{
    this.comercioLikes.likes=this._comerciosService.verLikes(i);
    this.comercioLikes.nombre = this._comerciosService.getComercioNombre(i);
    this.comercioLikes.id = this._comerciosService.getComercioId(i);
    this.comerciosLikeService.update(this.comercioLikes)
    .subscribe( json => {
      Swal.fire('Cliente Actualizado',`${json.mensaje} : ${json.comercio.nombre}`, 'success')
})
}*/
}