import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-comercio',
  templateUrl: './crear-comercio.component.html',
  styleUrls: ['./crear-comercio.component.css']
})
export class CrearComercioComponent implements OnInit {
 comercio : any={};
 fechaHoy : Date = new Date();
 private archivo : File;
 private archivo1 : File;
 private archivo2 : File;
  visible: boolean;
  visibleFoto: boolean=false;;

 id:any={};
  constructor(private comerciosService : ComerciosService,
                private router : Router,
                private activatedRoute: ActivatedRoute,
                
                ) { }

  ngOnInit() {
  this.visible=false;
  }
  create(): void{
    this.comercio.createAt=this.fechaHoy;
    this.comercio.likes=0;
    this.comercio.visitas=0;

    this.comerciosService.create(this.comercio).subscribe
    (json => {
    swal.fire('Se ha creado el comercio: ', `${json.comercio.nombre}`, 'success');
    this.id=`${json.comercio.id}`;
    console.log(this.id);
    })
 this.visible=true;
    
  }
  
    seleccionarFoto(event){
      this.archivo = event.target.files[0];
      
      console.log(this.archivo);

      
    }
    seleccionarFoto1(event){
     
      this.archivo1 = event.target.files[0];
     

      console.log(this.archivo1);
    }   
     seleccionarFoto2(event){
    
      this.archivo2 = event.target.files[0];

      console.log(this.archivo2);
    }
    subirFoto(){
  
    this.comerciosService.subirFoto(this.archivo, this.archivo1, this.archivo2, this.id)
      .subscribe(comercio =>{
        this.comercio = comercio;    this.visibleFoto=true;
        })
    }

    nuevoComercio(){
      this.visible=false;
      //this.comercio= new Comercio();
    }
  }
