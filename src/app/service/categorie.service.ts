import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { Categorie} from '../model/categorie'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
 
  private baseUrl = 'http://localhost:8080/api';
 
  choixmenu : string  = 'A';

  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
  listData : Observable<Categorie[]>;
  
  getData(code: string): Observable<Object> {
    
     return this.http.get(`${this.baseUrl}/categories/${code}`);
    }
getNumero() 
 { 
   return this.http.get(`${this.baseUrl}/categories/7`);
}
getcategoriebylibelle(libelle: string): Observable<any>  {
  return this.http.get(`${this.baseUrl}/categories/recherche/${libelle}`);
}

    CreateData(info:Object):Observable<Object> {
      return this.http.post(`${this.baseUrl}/categories`,info);     
    }
   updateData(code: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/categories/${code}`, value);
    }

   
    deleteData(code: string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${code}`, { responseType: 'text'});
    }
    getAll(): Observable<any> {
      return this.http.get(`${this.baseUrl}/categories`);
    }
    getAllbylibelle(libelle :string ): Observable<any> {
      return this.http.get(`${this.baseUrl}/categories/recherche/${libelle}`);
    }
   getExcelData() {
      return this.http.get<any>(`${this.baseUrl}/categories/export/excel`, { responseType: 'arraybuffer' as 'json' });
    }
    

  }        
