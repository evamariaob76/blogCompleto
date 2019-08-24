import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormArray } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../clientes/cliente';
import { ClientesComponent } from '../clientes/clientes.component';



@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  clientes: Cliente[]=[]

  form: FormGroup;

  constructor( private clienteService: ClienteService) {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes

 );
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

}
existeUsuario(control: FormControl): Promise <any>| Observable<any>{

  let promesa = new Promise(
                        ( resolve, reject)=>{
      
                  setTimeout( ()=>{
                    if( control.value=== "eva"){
                      resolve( {existe: true} )
                    }
  
                    else{
                      resolve( null )
                    }
                  },3000)
                }
                )
                return promesa;

  }
/*noigual(control:FormControl):{[s:string:boolean]}{
  let forma:any=this;
  if(control.value!=FormArray.controls['username'].value){
    return{
      noiguales:true
    }
  }
return null;
}*/




}
