import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    var fechaActual = new Date();
    var fecha= fechaActual.getFullYear();
    console.log(fecha);
     document.getElementById('fecha').innerHTML= fecha.toString();
  
  }

}
