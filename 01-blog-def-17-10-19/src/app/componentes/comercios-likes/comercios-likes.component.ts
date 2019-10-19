import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ComercioLikes } from './comercio.likes';
import { tap } from 'rxjs/operators';
import { Comentario } from '../../servicios/comentarios.service';
import swal from 'sweetalert2';
import { getPackedSettings } from 'http2';


@Component({
  selector: 'app-comercios-likes',
  templateUrl: './comercios-likes.component.html',
  styleUrls: ['./comercios-likes.component.css']
})
export class ComerciosLikesComponent implements OnInit {
 comercios : Comercio[]=[];
paginador: any;


  constructor( private comercioService: ComerciosService,
                private activatedRoute: ActivatedRoute

    ) {}

  ngOnInit() {
this.getComercios();


}
getComercios(){

  this.activatedRoute.paramMap.subscribe(params => {//función que llama al servicio para poder hacer un listado mediante páginas
    let page: number = +params.get('page');

    if (!page) {
      page = 0;
    }

    this.comercioService.getComerciosAll(page)
      .pipe(
        tap(response => {
          console.log('LikesComponent: tap 3');
          (response.content as Comercio[]).forEach(comercio => console.log(comercio.nombre));
        })
      ).subscribe(response => {
        this.comercios = response.content as Comercio[];
        this.paginador = response;
      });
  });


}
  delete(comercio: Comercio): void {//función que llama al servicio delete de comercios para eliminar el comercio

    swal.fire({
      title: '¿Está seguro de que quiere eliminar este comercio?',//advertencia de seguridad previa a la eliminación del comercio
      text: `${comercio.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.comercioService.delete(comercio.id).subscribe(
          response => {
            swal.fire(
              'Comercio eliminado!',
              'ha sido eliminado correctamente.',
              'success')
          }


        )
      }
    })

  }
}