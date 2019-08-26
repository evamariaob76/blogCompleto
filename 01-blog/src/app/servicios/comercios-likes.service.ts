import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComerciosService } from './comercios.service';
import { COMERCIOLIKES } from '../componentes/comercios-likes/comercios.likes.json';
import { ComercioLikes } from '../componentes/comercios-likes/comercio.likes';
import { Observable, of, pipe, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ComerciosLikesService {
  private httpHeaders = new HttpHeaders({'Conten-Type': 'aplication/json'});

  constructor(private http: HttpClient,private router : Router, private comercioService: ComerciosService) { }

  private url: string  ='http://localhost:8080/api/comercios';
  private urlLikes: string  ='http://localhost:8080/api/comercios/:id/likes';

private httpheaders = new HttpHeaders({'Content-Type': 'application/json'})
    getComercioLike(id): Observable<ComercioLikes> {
       //return of(COMERCIOLIKES);
       return this.http.get<ComercioLikes>(`${this.url}/${id}`);
    }

    addLike(id: number): Observable<any> {
      return this.http.post<any>(`${this.url}/${id}/likes`, { headers: this.httpheaders } );
    }

    getComerciosLike(): Observable<ComercioLikes[]>{
      return this.http.get<ComercioLikes[]>(this. url);
     }

     update(comercioLikes: ComercioLikes): Observable<any>{
      return this.http.put<any>(`${this.url}/${comercioLikes.id}`, comercioLikes, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          Swal.fire(  e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
          })
        ); 
    }
}
