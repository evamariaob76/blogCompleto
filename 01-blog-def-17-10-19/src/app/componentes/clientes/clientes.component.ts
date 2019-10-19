import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ClienteService } from '../../servicios/cliente.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]=[]
  paginador: any;

  constructor( private clientesService: ClienteService,
               private router: Router,
               private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clientesService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }
  delete(cliente: Cliente):void{

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
