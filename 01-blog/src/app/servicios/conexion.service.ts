import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  constructor(private hhtp: HttpClient) { }

  Url='http://localhost:4200';
  
   }

