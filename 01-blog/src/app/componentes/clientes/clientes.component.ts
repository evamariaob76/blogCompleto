import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ClienteService } from '../../servicios/cliente.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]=[]
    
  constructor( private clientesService: ClienteService,
               private router: Router
    ) { }

  ngOnInit() {
   this.clientesService.getClientes().subscribe(
        clientes => this.clientes = clientes

   );
  }
  delete(cliente: Cliente):void{
 // this.router.navigate(['/autenticacion'])

  swal.fire({
    title: '¿Está seguro de que quiere eliminar esta entrada?',
    text: `${cliente.nombre}{cliente.apellido}`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.value) {
      this.clientesService.delete(cliente.id).subscribe(
        responde=>{
          this.clientes = this.clientes.filter (cli => cli !==cliente)

                swal.fire(
        'Cliente eliminado!',
        'ha sido eliminado correctamente.',
        'success')
        }
      

      )
    }
  })

}
}
