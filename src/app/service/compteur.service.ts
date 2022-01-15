import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compteur} from '../model/compteur'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompteurService {
  private baseUrl = 'http://localhost:8080/api';
  choixmenu : string  = 'A';
  listData : Compteur[];
  public dataForm:  FormGroup; 
  
  constructor(private http: HttpClient) {}
 getData(annee: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/compteurs/${annee}` ,{ responseType: 'text' });
    }
   
    createData(info: Object): Observable<Object> {
      return this.http.post(`${this.baseUrl}/compteurs`, info);
    }
    
    getdata(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/compteurs/${id}`);
   }
   
    deleteData(id: number): Observable<any> {
     
      return this.http.delete(`${this.baseUrl}/compteurs/1/${id}`, { responseType: 'text' });
    }
  
    getAll(): Observable<any> {
     
      return this.http.get(`${this.baseUrl}/compteurs`);
    }
  }
  
   

