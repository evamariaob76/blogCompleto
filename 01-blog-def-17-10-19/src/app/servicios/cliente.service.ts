import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError} from 'rxjs';
import { CLIENTES } from '../../app/componentes/clientes/clientes.json';
import { Cliente } from '../componentes/clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router'; 
import { formatDate } from '@angular/common';
import { AutenticacionService } from './autenticacion.service';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor( private http: HttpClient,
               private router: Router,
               private authService: AutenticacionService) { }

               private agregarAuthorizationHeader() {
                let token = this.authService.token;
                if (token != null) {
                  return this.httpHeaders.append('Authorization', 'Bearer ' + token);
                }
                return this.httpHeaders;
              }

    private isNoAutorizado(e):boolean{
      if(e.status==401){

        //this.router.navigate(['/home'])
        return true;
      }
      if(e.status==403){
        swal.fire('Acceso denegados', 'Hola: '+ this.authService.usuario.username+"no tienes acceso a este recurso",'warning');
       // this.router.navigate(['/home'])
       
      }
    }
  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
          this.isNoAutorizado(e);
          return throwError(e);

      }),
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

   /* return this.http.get<Cliente[]>(this. url).pipe(
    map (response => response as Cliente[]); otra forma de hacerlo
*/
   
   create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
         //return this.http.get<Cliente>('this.url', 'this.cliente.'});
  }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
          catchError(e => {
            if(this.isNoAutorizado(e)){
              return throwError(e);
    
            }
          this.router.navigate(['/autenticacion'])
          // console.error(e.error.mensaje);
          swal.fire('error al editar:', e.error.mensaje, 'error')
            return throwError(e);
          })
        );
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        swal.fire( e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 



  }

}