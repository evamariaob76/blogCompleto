import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosLikesService } from '../../servicios/comercios-likes.service';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ComercioLikes } from './comercio.likes';

@Component({
  selector: 'app-comercios-likes',
  templateUrl: './comercios-likes.component.html',
  styleUrls: ['./comercios-likes.component.css']
})
export class ComerciosLikesComponent implements OnInit {
comercioLikes : ComercioLikes[];
  constructor( private comercioLikesService: ComerciosLikesService) {}

  ngOnInit() {
    this.comercioLikesService.getComerciosLike().subscribe(
      comercioLikes => this.comercioLikes = comercioLikes
);

}
}