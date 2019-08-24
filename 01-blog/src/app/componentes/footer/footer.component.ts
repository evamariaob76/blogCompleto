import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  comercios: Comercio[] = [];

  constructor(private _comerciosService: ComerciosService, private router: Router) { }

  ngOnInit() {
    this.comercios = this._comerciosService.getComercios();

  
  }

}
