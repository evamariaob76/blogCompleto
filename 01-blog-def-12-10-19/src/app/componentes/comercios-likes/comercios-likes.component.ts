import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ComercioLikes } from './comercio.likes';
import { tap } from 'rxjs/operators';

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
    this.activatedRoute.paramMap.subscribe(params => {
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
}