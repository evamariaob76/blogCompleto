import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private httpHeaders = new HttpHeaders();
  private url : string = 'http://localhost:8080/api/comentarios';

constructor(private router: Router,
            private http : HttpClient,
            
            ) {
    console.log("servicio comentarios ok");
}


getComentarios() : Observable <Comentario[]>{
  return this.http.get<Comentario[]>(this.url);

}



getComentario (id: number) : Observable<Comentario>{
  return this.http.get<Comentario>(`${this.url}/${id}`).pipe(
    catchError(e => {
    // console.error(e.error.mensaje);
    swal.fire('error al editar:', e.error.mensaje, 'error')
      return throwError(e);
    }),  
  );

}

getComentarioComercio (id: number) : Observable<Comentario>{
  return this.http.get<Comentario>(`${this.url}/comercio/${id}`).pipe(
    catchError(e => {
    // console.error(e.error.mensaje);
    swal.fire('error al editar:', e.error.mensaje, 'error')
      return throwError(e);
    }),  
  );

}
update(comentario: Comentario): Observable<any>{
  return this.http.put<any>(`${this.url}/contestacion/${comentario.id_comercio}/${comentario.id}`, comentario, {headers: this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      swal.fire(  e.error.mensaje, e.error.error, 'error' );
    return throwError(e);
      })
    ); 
}

create(comentario: Comentario): Observable<any>{
  return this.http.post<any>(`${this.url}/${comentario.id_comercio}`, comentario,{headers:this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      swal.fire(  e.error.mensaje, e.error.error, 'error' );
    return throwError(e);
      }
      ) 

    ); 
}
  delete(id: number): Observable<Comentario[]> {
    return this.http.delete<Comentario[]>(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )


  }
/*update(comercio: Comercio): Observable<any>{
  return this.http.put<any>(`${this.url}/${comercio.id}`, comercio, {headers: this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      Swal.fire(  e.error.mensaje, e.error.error, 'error' );
    return throwError(e);
      })
    ); 
}

delete(id: number): Observable<Comercio[]>{
  return this.http.delete<Comercio[]>(`${this.url}/${id}`, {headers:this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      Swal.fire( e.error.mensaje, e.error.error, 'error' );
    return throwError(e);
      })
    ); 


}*/
}

export class Comentario{
    id:number;
    comentario: string;
    id_comercio: number;
    nombre : string;
    email: string;
    fecha: Date;
    contestacion: string;
 
};




