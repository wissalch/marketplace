import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../model/user';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:8080/api';
  //private baseUrl1 = '/api/users/5';
 private baseUrl1 = 'http://localhost:8080/api/authenticate';
   login ;
   user:any={};
 islogin = false;
  admin = false;
  suser = false;
  client = false;
  four = false;
  public dataform: FormGroup;
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
 listData : User[];
 name : string = "Foulen";
  public dataForm:  FormGroup; 
  public form:  FormGroup;
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  list : Observable<User[]>;
  Login(username: string): Observable<Object> {
     return this.http.get(`${this.baseUrl}/users/5/${username}`);
   }  

   

   verifEmail(email: string) {
    return this.http.get(`${this.baseUrl}/users/verif/${email}`);
  }

 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
  getdata(code: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/user/${code}`);
  }
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/users`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/${id}`, value);
  }
  get(username: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/users/5/${username}`);
  }
  

  getuserbynom(username: string): Observable<any>  {
    return this.http.get(`${this.baseUrl}/users/recherche/${username}`);
  }
  



  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/users/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/users`);
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getExcelData() {
    return this.http.get<any>(`${this.baseUrl}/user/export/excel`, { responseType: 'arraybuffer' as 'json' });
  }
}
 
  