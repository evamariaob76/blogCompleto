import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrls: ['./menu-dinamico.component.css']
})
export class MenuDinamicoComponent implements OnInit {

  comercios: Comercio[] = [];
  comercio : Comercio;


  constructor(private activatedRoute: ActivatedRoute, 
              private comerciosService: ComerciosService,
              private router: Router) {

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

    ngOnInit() {
     this.cargarComercio();
     this.comerciosService.getComercios().subscribe(
      comercios => this.comercios = comercios,

     );
}
}