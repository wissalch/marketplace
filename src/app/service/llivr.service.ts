import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livr } from '../model/livr';
import { Llivr } from '../model/llivr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LlivrService {

  private baseUrl = 'http://localhost:8080/api';
  public formData:  FormGroup; 
  list : Llivr[] = [];
  constructor(private http:HttpClient,private toastr: ToastrService) { }
  choixmenu : number = 1;
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/llivrs/${id}`);
  }
 
  saveOrUpdate(info: Object): Observable<Object> {
  
    return this.http.post(`${this.baseUrl}/llivrs`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/llivrs/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/llivrs/${id}`, { responseType: 'text' });
  }

  getall(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Llivrs`);
  }
  getAll(numero: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/llivrs/${numero}`);
  } 
}
