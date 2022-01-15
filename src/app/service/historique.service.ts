import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, observable } from 'rxjs';
import { Client } from '../model/client'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private baseUrl = 'http://localhost:8080/api';
  listhistorique : any=[];

  constructor(private http: HttpClient) { }

  save(info: Object) {
   
    return this.http.post(`${this.baseUrl}/historique`,info);
   }

   getall(nom:string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historique/${nom}`);
  }
}
