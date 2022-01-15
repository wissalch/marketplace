import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { Souscategorie} from '../model/souscategorie'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {

 
    private baseUrl = 'http://localhost:8080/api';
    choixmenu : string  = 'A';
    tokenStr = localStorage.getItem('token');
  listData : Souscategorie[];
  
    public dataForm:  FormGroup; 
    constructor(private http: HttpClient) { }
  
    getdata(code: string): Observable<Object> {
    
      return this.http.get(`${this.baseUrl}/souscategories/${code}`);
     }
  
     getsouscategoriebylibelle(libelle: string): Observable<any>  {
      return this.http.get(`${this.baseUrl}/souscategories/recherche/${libelle}`);
    }

    getData(code: string): Observable<Object> {
    
      return this.http.get(`${this.baseUrl}/souscategories/${code}`);
     }
    
     CreateData(info:Object):Observable<Object> {
       return this.http.post(`${this.baseUrl}/souscategories`,info);     
     }
    updateData(code: string, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/souscategories/${code}`, value);
     }
   // updateRang(code: string, value: any): Observable<object> {
      //return this.http.patch(`${this.baseUrl}/souscategories/6/${code}`, { responseType: 'text'} );
   // } 
   public updateRang(code: number, value: any): Observable<Object> {
      return this.http.patch(`${this.baseUrl}/souscategories/5/${code}`, value);
  }
     getNumero(code: string) 
     { 
       return this.http.get(`${this.baseUrl}/souscategories/7/${code}`);
    }
    
    
     deleteData(code: string) : Observable<any> {
     return this.http.delete(`${this.baseUrl}/souscategories/${code}`, { responseType: 'text'});
     }
     getAll(): Observable<any> {
       return this.http.get(`${this.baseUrl}/souscategories`);
     }
      getall(): Observable<any> {
       return this.http.get(`${this.baseUrl}/souscategories/get`);
     }
     
     listSouscateg(code: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/souscategories/5/${code}`);
    }
    getExcelData() {
      return this.http.get<any>(`${this.baseUrl}/souscategories/export/excel`, { responseType: 'arraybuffer' as 'json' });
    }
  }
  
  
  
  
  
  
  