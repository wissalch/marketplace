import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livr } from '../model/livr';
import { Llivr } from '../model/llivr';
import { SocieteService } from '../service/societe.service';
import { ClientService } from '../service/client.service';
import { LlivrService } from '../service/llivr.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
  import { map } from 'rxjs/operators';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class LivrService {

  private baseUrl = 'http://localhost:8080/api';
  public formData:  FormGroup; 
  list : any=[];
  livr    : any={};
  listlivr : any=[];
  ste : any={};
  client : any={};
  llivrs : any={};
  constructor(private http:HttpClient,private toastr: ToastrService,
    public steService : SocieteService,public llivrservice : LlivrService,
    public clientService : ClientService) { }
  choixmenu : number = 1;
  //llivrs : Observable<Llivr[]>;
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/livrs/${id}`);
  }
 
  saveOrUpdate(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/livrs`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/livrs/${id}`, value);
  }
  getlivrfour(codef : number) {
    return this.http.get(`${this.baseUrl}/livr/four/${codef}`);
  }
  
  

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/livrs/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/livrs`);
  }
  getDocument(id :number) {
    {
      this.getData(id).subscribe(
       response =>{
         this.livr = response;
         this.clientService.getdata(this.livr.code).subscribe(
          response =>{
            this.client = response;
        
            }
         );
       
         
         }
      ); 
     
      this.steService.getData(1).subscribe(
        response =>{
          this.ste = response;
          }
       ); 
      
       
          sessionStorage.setItem('livr', JSON.stringify(this.livr));
        return {
          content: [
            {
              columns: [
                [{
                  text: this.ste.libelle ,
                  style: 'name'
                },
                {
                  text: this.ste.slibelle,
                  style: 'name'
                },
                {
                  text: this.ste.adresse,
                  style: 'name'
                },
               
                {
                  text: 'MarketPlace: ',
                  color: 'blue',
                },
                ],
              ]
            },
            {
              text: 'Bon de Livraison',
              bold: true,
              fontSize: 20,
              alignment: 'center',
              margin: [0, 20,20, 20]
            },
           
            {
              columns: [
                [{
                  text: 'Numero : '+ this.livr.numero ,
                  style: 'ligne',
                  margin: [0,10, 0, 0] 
                },
                {
                  text: ' Date : ' +this.livr.date_mvt,
                  style: 'ligne',
                  margin: [0,10, 0, 0] 
                 },
                {
                  text: 'Code :  '+ this.livr.code ,
                  style: 'ligne1',
                 },
                {
                  text: 'Client :  '+ this.livr.libcl ,
                  style: 'ligne1',
              
                },
                {
                  text: 'Adresse  : Tunis ',
                  style: 'ligne1',
                
                },
                {
                  text: 'Tel  :28145235  ',
                  style: 'ligne1',
                },
                {
                  
                  },
                 ],
              ]
            },
            
            {
              text: ' ',
              style: 'header'
            },
            
            
           this.getDetails(this.livr.llivrs),
           {
            
           },
    
           {
            text: ' ',
            style: 'header'
          },
    
            {
              text: '  Tot ht  : ' + this.livr.totht +  '      Tot Rem  : ' + this.livr.totrem
              +'        Tot Tva   : ' + this.livr.tottva +'      Tot TTC  : ' + this.livr.totttc,
              style: 'total',
              
            },
            
            {
              text: 'Signature',
              style: 'sign',
              alignment : 'right'
    
            },
           
          ],
         
            styles: {
              header: {
                fontSize: 18,
                bold: true,
            
                 alignment: 'center',
              },
              name: {
                fontSize: 16,
                bold: true
              },
              total: {
                fontSize: 12,
                bold: true,
                italics: true,
                
              },
              ligne: {
                fontSize: 12,
                bold: true,
                italics: true
              },
              ligne1: {
                fontSize: 12,
                bold: true,
                italics: true,
                margin: [300,10, 0,0]
              },
              sign: {
                margin: [0, 50, 20, 10],
                alignment: 'right',
                italics: true
              },
              tableHeader: {
                bold: true,
                fontSize: 15,
                alignment: 'center',
              }
            }
        };
      }
       }

      
       getDetails(items: Llivr[]) {
         
        return {
          
          table: {
            widths: [ 200, 50, 50,50,50,50],
            body: [
              [
              {
                text: 'Désignation',
                style: 'tableHeader'
              },
              {
                text: 'Prix',
                style: 'tableHeader'
              },
              {
                text: 'Qté',
                style: 'tableHeader'
              },
              {
                text: 'Rem',
                style: 'tableHeader'
              },
              {
                text: 'Tva',
                style: 'tableHeader'
              },
              {
                text: 'Mont Ht',
                style: 'tableHeader'
              },
              ],
            
              ...items.map(ed => {
               return [ed.libart, ed.pu, ed.qte, ed.rem,ed.tva,ed.totht];
              })
            ]
          }
        };
      }}
