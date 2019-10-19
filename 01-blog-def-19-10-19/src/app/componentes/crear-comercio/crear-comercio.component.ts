import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { EmailService } from '../../servicios/email.service';

import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import fs from 'fs-es6'

@Component({
  selector: 'app-crear-comercio',
  templateUrl: './crear-comercio.component.html',
  styleUrls: ['./crear-comercio.component.css']
})
export class CrearComercioComponent implements OnInit {
  comercio: any = {};
  fechaHoy: Date = new Date();
   archivo: File;
   archivo1: File;
   archivo2: File;
  visible: boolean=false;
  visibleFoto: boolean = false;;
  updateFoto = false;
  comercioCreado:boolean=false;
  id: any = {};
  foto :boolean=false;
  crear: boolean=false;
  constructor(private comerciosService: ComerciosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private emailService: EmailService

  ) { }

  ngOnInit() {//al cargarse la página se llama a la funcion cargarComercio que mostrará el comercio en el caso de que se vaya a editar
    this.cargarComercio();
  }

  cargarComercio() {//carga el comercio a editar
    this.activatedRoute.params.subscribe(params => {//subscribiéndome a los parámetros tenemos la id de comercio
      let id = params['id']
      if (id) {
       // this.comercioCreado=true;
        this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio))
      }
    })
  }
 
  create(): void {//creamos un nuevo comercio
    this.comercio.createAt = this.fechaHoy;
    this.comercio.likes = 0;
    this.comercio.visitas = 0;
    this.comerciosService.create(this.comercio).subscribe
      (json => {
        swal.fire('Subamos ahora las fotos de:', `${json.comercio.nombre}`, 'success');
        this.id = `${json.comercio.id}`;
      })
    this.visible = true;
   // this.enviarmail();//función que hace que cuando se crea un comercio nuevo mande un mail de información
  }

  seleccionarFoto(event){//función que recoge la  información de img
    this.archivo = event.target.files[0];
  }
  seleccionarFoto1(event) {//función que recoge la  información de img1
    this.archivo1 = event.target.files[0];
  }
  seleccionarFoto2(event) {//función que recoge la  información de img2
    this.archivo2 = event.target.files[0];
  }

  
  seleccionarUnaFoto(event, id_foto) {//función que recoge la  información de img en el caso de actulizar una foto
    this.archivo = event.target.files[0];
    this.uploadFoto(id_foto);
  }
 
  subirFoto() {//función para subir todas las fotos de un comercio creado
    if(this.seleccionarFoto1|| this.seleccionarFoto2||this.seleccionarFoto){
    this.comerciosService.subirFoto(this.archivo, this.archivo1, this.archivo2, this.id)
      .subscribe(comercio => {
        this.comercio = comercio; 
        this.visibleFoto = true;
        this.cargarComercio();//llamo a la función para que se actualice la foto mostrada una vez creada
      })
  }
      else{
          swal.fire('Debe seleccionar todas las fotos: ', 'error');
      }
 }


  uploadFoto(id_img) {//Condición que establece la subida de la foto actualizada en función de la imagen que se quiera actualizar
      switch (id_img) {
        case 1:
          this.subir1Foto(1);
          break;
        case 2:
          this.subir1Foto(2);
          break;
        case 3:
          this.subir1Foto(3);
          break;
      }
  }

  subir1Foto(id_img){//Función que llama al Servicio y actualiza la foto
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      
      this.comerciosService.subir1Foto(this.archivo, id, id_img)
        .subscribe(json => {
          swal.fire('Se ha actualizado la imagen: ', 'success');
          this.cargarComercio();
          this.foto = true;;
        })
    })
  }

  nuevoComercio() {//función que resetea los campos para incluir un nuevo comercio
    this.visible = false;
    this.comercio = new Comercio();
  }

  update(): void {//función que llama al servicio correspondiente para actualizar el comercio
    this.comerciosService.update(this.comercio).subscribe
      (json => {
        swal.fire('Se ha actualizado el comercio: ', `${this.comercio.nombre}`, 'success');
       // this.id = `${json.comercio.id}`;
       // console.log(this.id);
      })
    this.visible = true;
    this.comercioCreado==true;
  }

  cancelar() {//función que redirige al panel de administración si nos e quiere actualizar foto
    this.router.navigate(['/admin'])
  }

  actualizarFoto(): void {//función que llama al servicio  insertar todas las fotos al comercio creado
    this.comerciosService.update(this.comercio).subscribe
      (json => {
        swal.fire('Se ha actualizado el comercio: ', `${this.comercio.nombre}`, 'success');
        this.id = `${json.comercio.id}`;
        console.log(this.id);
        this.cargarComercio();
      })
    this.visible = true;
    this.updateFoto = true;;
  }
  enviarmail() {

    this.emailService.sendEmail().subscribe();
  }
}
