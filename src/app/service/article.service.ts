import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article} from '../model/article'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/api';
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
 // listData : Article[];
listData : any=[];
 //listData : Observable<Article[]>;
  libelle: string;
  nomf: string;
  article: any={};
  Article: any={};
  public dataForm:  FormGroup; 
  public DataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/articles/${id}`);
 }
 getarticle(code: string): Observable<Object> {
  return this.http.get(`${this.baseUrl}/articles/get/${code}`);
}
  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/articles`, formData);
  }
  
  getarticlesbylibelle(libelle: string): Observable<any>  {
    return this.http.get(`${this.baseUrl}/articles/recherche/${libelle}`);
  }
  findarticle(libelle: string, code:number): Observable<any>  {
    return this.http.get(`${this.baseUrl}/articles/rechfour/${libelle}/${code}`);
  }
  updatedata(code: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/articles/${code}`, value);
  }
 
  deleteData(code: string): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/articles/${code}`, { responseType: 'text' });
  }
 
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/articles`);

  }


  uploadfile(file: File): Observable<HttpEvent<{}>> {
   
      const formdata: FormData = new FormData();
      formdata.append('file' , file);
      const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata , {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);

  }

 getListArtf(code : number) {
  return this.http.get(`${this.baseUrl}/articles/f/${code}`);
}
getExcelData() {
  return this.http.get<any>(`${this.baseUrl}/articles/export/excel`, { responseType: 'arraybuffer' as 'json' });
}


}




  