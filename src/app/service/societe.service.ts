import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Societe} from '../model/societe';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Client} from '../model/client';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {
private baseUrl = 'http://localhost:8080/api';
choixmenu : string ='A';
list : Societe[];
public dataForm: FormGroup;
  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/societe/${id}`);
 }
 
 Maxnumc() 
 { 
   return this.http.get(`${this.baseUrl}/societes/7`);
}

  createData(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/societes`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/societes/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/societes/${id}`, { responseType: 'text' });
  }
 
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/societes`);

  }


}




  
