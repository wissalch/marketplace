import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


import { Lcommande } from '../model/lcommande';
@Injectable({
  providedIn: 'root'
})
export class LcommandeService {
  lcomm : any=[];
  private baseUrl = 'http://localhost:8080/api';
  lcommande : Lcommande = new Lcommande();
  lcommandeList : Lcommande[];
  public formData : FormGroup;
  listfour : any=[];
  constructor(private http: HttpClient) { }

  addLcomm(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/lcomms`, info);
  }
 
 
 getAll(numero: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/lcomms/${numero}`);
 } 

 getcommfour(codef : number) {
  return this.http.get(`${this.baseUrl}/lcomm/four/${codef}`);
}
deleteData(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/lcomms/${id}`, { responseType: 'text' });
}

} 
