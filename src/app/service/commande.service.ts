import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, observable } from 'rxjs';
import { Client } from '../model/client'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8080/api';
  public formData:  FormGroup; 
  nom : String;
  listData :  any=[];
  list :  any=[];
  commande    : any={};
  commstocke: any={};
  listcomm : any=[];
  constructor(private http: HttpClient) { }
  choixmenu : number = 1;
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/comms/${id}`);
  }  

  getcomm(nom : String) {
    return this.http.get(`${this.baseUrl}/comm/p/${nom}`);
  }
 
  verif(totttc: number) {
    return this.http.get(`${this.baseUrl}/comm/verif/${totttc}`);
  }

  saveOrUpdate(info: Object) {
   
   return this.http.post(`${this.baseUrl}/comms`,info);
  }
 
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/comms/${id}`, value);
  }
  getlistcomm(nom : String) {
    return this.http.get(`${this.baseUrl}/comm/f/${nom}`);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comms/${id}`, { responseType: 'text' });
  }

  delete(numero: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comms/dell/${numero}`, { responseType: 'text' });
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comms`);
  }
  getcommBynum(numero : String) {
    return this.http.get(`${this.baseUrl}/comms/num/${numero}`);
  }
 
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
 
}
