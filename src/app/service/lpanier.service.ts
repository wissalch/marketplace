import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LpanierService {
  list : any=[];
  lpanier;
  totttc: number = 0;
  private baseUrl = 'http://localhost:8080/api';
 
  constructor(private http: HttpClient) { }

  
  addLcomm(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/lpaniers`, info);
  }
 
 
 getAll(numero: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/lpaniers/${numero}`);
 } 

 getlpanier(numero: number): Observable<Object> {
  return this.http.get(`${this.baseUrl}/lpaniers/lc/${numero}`);

} 
deleteData(id: number): Observable<any> {
   
  return this.http.delete(`${this.baseUrl}/lpaniers/${id}`, { responseType: 'text' });
}

deleteAll(numero: number): Observable<any> {
   
  return this.http.delete(`${this.baseUrl}/lpaniers/del/${numero}`, { responseType: 'text' });
}

}
