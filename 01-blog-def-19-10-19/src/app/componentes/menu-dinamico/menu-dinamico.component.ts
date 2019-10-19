import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompartirInformacionService } from '../../servicios/compartir-informacion.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrls: ['./menu-dinamico.component.css']
})
export class MenuDinamicoComponent implements OnInit {

  comercios: any[] = [];
  comercio: []=[];
  mes: any;
  termino: any;
comerciosMeses: any[]=[];
me:any []=[];
m: any[]=[];
cero: number;
  sortedActivities:any[]=[];
  constructor(private activatedRoute: ActivatedRoute,
    private comerciosService: ComerciosService,
    private compartirInformacionService: CompartirInformacionService,

    private router: Router) {


  }

  
  ngOnInit() {

    this.comerciosService.findOneComercioByDate().subscribe(me => {
      this.me = me.reverse()})
    this.compartirInformacionService.getMeses().subscribe(mes => {
      this.mes = mes;
    this.mes.reverse();})
    //this.cargarComercio();
    /*this.comerciosService.getComercios().subscribe(
      comercios => this.comercios = comercios.reverse(),

    );
    this.compartirInformacionService.getMeses().subscribe(mes =>{
this.mes = mes;

      for (this.m of this.mes) {
        this.m=this.mes;
      }  
      for (let i = 0; i < this.m.length; i++) {
        console.log('this.m' + this.m[i])
        this.comerciosService.findOneComercioByDate(this.m[i]).subscribe(
          comerciosMeses => {
            this.comerciosMeses[i] = comerciosMeses;
          this.me.push(this.comerciosMeses[i][0]);

          }, 
          );
      }  */
    //  this.me.reverse();
      //this.me.push(this.comerciosMeses);                 


  //  } 
   // );
   // this.comerciosPorMes();


 // }
  /*cargarComercio(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio));

      }
    })
  }*/
}

 verFecha(mes: number) {
    this.comerciosService.getComercioFecha(mes).subscribe(params => {

      this.router.navigate(['/mes',mes]), console.log(this.comerciosService);
      console.log(mes);

      //  this.router.navigate(['/comercios', actividad]);
    })
}

}