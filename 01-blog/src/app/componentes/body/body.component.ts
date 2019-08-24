import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  comercios: Comercio[] = [];
  like: Comercio[] = [];

  constructor(private _comerciosService: ComerciosService, private router: Router) {

  }

  ngOnInit() {
    this.comercios = this._comerciosService.getComercios();


  }

  verComercio(i:number){
    this.router.navigate(['/comercio', i]);
    console.log(i);


  }
  guardarLikes(i:number){

      console.log(this._comerciosService.verLikes(i));
  }
     }
    

