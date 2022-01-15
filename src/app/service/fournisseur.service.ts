import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur} from '../model/fournisseur'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = 'http://localhost:8080/api';
  choixmenu : string  = 'A';
  list : Fournisseur[];
  listData : Observable<Fournisseur[]>;
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(code: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/fournisseurs/${code}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/fournisseurs`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/fournisseurs/9/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/Fournisseurs/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/fournisseurs/fr`);
  }
  
}


