import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, observable } from 'rxjs';
import { Client } from '../model/client'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/api';
  choixmenu : String = 'A' ;
  list : Client[];
  
  public dataForm: FormGroup;
  constructor(private http: HttpClient) {}
  listData : Observable<Client[]>;
  getData(id: number): Observable<object> {
return this.http.get(`${this.baseUrl}/clients/${id}`);
}
 getdata(code: string): Observable<object> {
return this.http.get(`${this.baseUrl}/client/${code}`);
}
createData(info: object): Observable<object> {
return this.http.post(`${this.baseUrl}/Clients`,info);
 }
 updatedata(code: string, value: any): Observable<object> {
return this.http.put(`${this.baseUrl}/clients/${code}`, value);
 }

 
 deleteData(code: string): Observable<any> {
return this.http.delete(`${this.baseUrl}/clients/${code}`, { responseType: 'text' });
 }

 getMax() 
 { 
   return this.http.get(`${this.baseUrl}/clients/7`);
}
 
 getAll(): Observable<any> {
   return this.http.get(`${this.baseUrl}/clients`);
 }
}




