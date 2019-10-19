import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private httpHeaders = new HttpHeaders();
  private url: string = 'http://localhost:8080/api/sendmail';
  constructor(private router: Router,
    private http: HttpClient) { }


  sendEmail(): Observable<any> {
    return this.http.post<any>(`${this.url}`, { headers: this.httpHeaders } ).pipe(
      catchError(e => {
        // console.error(e.error.mensaje);
        swal.fire('error al enviar mail:', e.error.mensaje, 'error')
        return throwError(e);
      }),
    );
  }
}
