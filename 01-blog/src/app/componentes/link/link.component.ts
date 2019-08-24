import { ComerciosService } from '../../servicios/comercios.service';
import { Router } from '@angular/router';
import { googleService } from '../../servicios/googlemaps.service';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  comercio: any = {};
  comercios: any = {};
  rutaLat: any = {};
  rutaLng: any = {};
  ruta: any= {};
  contenido: any= {};

  constructor(private activatedRoute: ActivatedRoute, 
              private comerciosService: ComerciosService,
              private router: Router,
              private google: googleService) {

      this.activatedRoute.params.subscribe (params => {
      this.comercio= comerciosService.getComercio(params['posicion']);
      this.comercios = this.comerciosService.getComercios();
      this.rutaLat= this.google.lat;
      this.rutaLng= this.google.lng;
     
  });

  }

  ngOnInit() {

}

}



/*verSituacion(){
  let URL=window.location.pathname;
  console.log(URL.charAt(URL.length - 1));
  let posicion = URL.charAt(URL.length - 1);
  this.router.navigate(['/link', posicion]);
  console.log(  this.comercio=this.comercioService.getComercio(posicion));
}
 initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}*/


