import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../servicios/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm, FormArray } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { map, catchError, tap } from 'rxjs/operators';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { EmailService } from '../../servicios/email.service';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {
  clientes: Cliente[]=[]
  admin : boolean = false;
  form: FormGroup;
 cliente: Cliente = new Cliente();
private titulo: string =" Crear cliente";
  constructor(private clienteService: ClienteService, 
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService : AutenticacionService
            ){

          
               }
  ngOnInit() {
this.cargarCliente();
    let page: number = 0;

    this.clienteService.getClientes(page).pipe(
      tap(response =>{
        console.log("clientes componenet tap3");
        (response.content as Cliente[]). forEach(cliente =>{
          console.log(cliente.nombre);
        });

      })
    ).subscribe(response =>this.clientes = response.content as Cliente[]);
}

  
 create(): void{
 

  this.clienteService.create(this.cliente).subscribe
  (json => {
  this.router.navigate(['/autenticacion'])
  swal.fire('Se ha guardado el cliente: ', `${json.mensaje} : ${json.cliente.username}`, 'success');
  }) }



cargarCliente():void{
  this.activatedRoute.params.subscribe(params =>{
  let id = params['id']
  if (id){
    this.clienteService.getCliente(id).subscribe((cliente => this.cliente = cliente))
  }
  })
}
CargarAdmin(){
  if(this.cliente.nombre=="eva"&&this.cliente.username=="evama"&&this.cliente.apellido=="ortiz"&&this.cliente.email=="evanma@hotmail.com"){
    this.admin =true;

  }
}
update(): void{
    this.clienteService.update(this.cliente)
    .subscribe( json => {
      this.router.navigate(['/autenticacion'])
      swal.fire('Cliente Actualizado',`${json.mensaje} : ${json.cliente.username}`, 'success')
})
}


}
