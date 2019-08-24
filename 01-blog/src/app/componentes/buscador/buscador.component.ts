import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComerciosService } from '../../servicios/comercios.service';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

    comercios:any[]=[];
    termino:string;
  constructor(private activatedRoute: ActivatedRoute,
    private _comercioService:ComerciosService) {

    


     }
  
  ngOnInit() {
      this.activatedRoute.params.subscribe(params=>{
        this.termino=(params['termino']);
      this.comercios=this._comercioService.buscarComercio ( params['termino'] );
  console.log(this.comercios);
  })
}

}
