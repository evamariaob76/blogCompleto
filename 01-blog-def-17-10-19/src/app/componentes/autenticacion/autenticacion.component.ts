import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormArray } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../clientes/cliente';
import { ClientesComponent } from '../clientes/clientes.component';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';



@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  clientes: Cliente[]=[]
  form: FormGroup;

  constructor( private clienteService: ClienteService,
                private router : Router) {
                

 
    /*  this.form= new FormGroup({
            'nombre': new FormControl('', [Validators.required,
                                            Validators.minLength(3)]),
            'apellido':new FormControl('', [Validators.required,
                                            Validators.minLength(5)]),
            'correo': new FormControl('', [Validators.required, 
                                          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
            'username': new FormControl('', [Validators.required, Validators.minLength(3)],[this.existeUsuario])


      })*/


     }
     guardarCambios(){
    console.log(this.form.value);
    console.log(this.form);

  }
  ngOnInit() {
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


}
