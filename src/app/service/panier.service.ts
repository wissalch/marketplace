import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

import { Panier } from '../model/panier';
import { Lpanier } from '../model/lpanier';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
public formData: FormGroup;
private baseUrl = 'http://localhost:8080/api';
list : any=[];
listdata : any=[];
DataForm;
listcomm : any=[];
listpanier : any=[];
listpaniers : any=[];
montttc : number = 0;
montant : number = 0;
nba :number = 0;
panier : any={};
tottht : number = 0;
tottva : number = 0;
totttc: number = 0;
nom:string;
qte:number;
annee;
numeropanier: string;
public formDatap : FormGroup;
panierstocke :any={};
fournisseur :any={};
choixmenu: string;
tokenStr = localStorage.getItem('token');
  constructor(private http:HttpClient,private toastr: ToastrService,) { }
  
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/paniers/9/${id}`, { responseType: 'text' });
 }
 getdata(numero: number): Observable<Object> {
  return this.http.get(`${this.baseUrl}/panier/${numero}`, { responseType: 'text' });
}

 
 
saveOrUpdate(value: any): Observable<Object> {
  return this.http.post(`${this.baseUrl}/paniers`, value);
}
getpanier(nom : String) {
  return this.http.get(`${this.baseUrl}/panier/p/${nom}`);
}


 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/paniers/${id}`, { responseType: 'text' , headers: { authorization: this.tokenStr }});
  }
 
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/paniers`);

  }
}
