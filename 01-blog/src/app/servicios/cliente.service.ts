import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError} from 'rxjs';
import { CLIENTES } from '../../app/componentes/clientes/clientes.json';
import { Cliente } from '../componentes/clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Conten-Type': 'aplication/json'});

  private url: string  ='http://localhost:8080/api/clientes';

  constructor( private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this. url);

   /* return this.http.get<Cliente[]>(this. url).pipe(
    map (response => response as Cliente[]); otra forma de hacerlo
*/
   }
   create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.url, cliente,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
         //return this.http.get<Cliente>('this.url', 'this.cliente.'});
  }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
          catchError(e => {
          this.router.navigate(['/autenticacion'])
          // console.error(e.error.mensaje);
          Swal.fire('error al editar:', e.error.mensaje, 'error')
            return throwError(e);
          })
        );
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire( e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 



  }
}