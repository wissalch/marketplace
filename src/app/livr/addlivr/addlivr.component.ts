import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Livr } from '../../model/livr';
import { LivrService} from '../../service/livr.service';
import { LlivrService} from '../../service/llivr.service'
import { HistoriquefourService} from '../../service/historiquefour.service'
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ClientService} from '../../service/client.service';
import { UserService} from '../../service/user.service';
import { CompteurService} from '../../service/compteur.service';
import { DatePipe } from '@angular/common';
import { AddllivrComponent } from '../../livr/addllivr/addllivr.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Observable } from "rxjs";
import { Article} from '../../model/article';
import { Llivr} from '../../model/llivr';
import { Client} from '../../model/client';
import pdfMake from 'pdfmake/build/pdfmake';
  import { map } from 'rxjs/operators';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-addlivr',
  templateUrl: './addlivr.component.html',
  styleUrls: ['./addlivr.component.css']
})
export class AddlivrComponent implements OnInit {
  ClientList: Client[];
    nomf:string;
  isValid:boolean = true;
  articleService: any;
  compteur : any={};
  client   : any= {};
  livr    : any={};
  annee  = 0;
  code:number;
  constructor(public service:LivrService,public userService:UserService,
    public compteurservice:CompteurService,
    private dialog:MatDialog,public fb: FormBuilder,
    public clientService :ClientService,
    private toastr :ToastrService,
    public llivrService : LlivrService, public histfourservice : HistoriquefourService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls;}

  ngOnInit(): void {
  this.userService.four
      this.nomf = (localStorage.getItem('username'));
    
    if (this.service.choixmenu == 1){
          this.InfoForm();
          this.service.list = [];
           this.f['annee'].setValue(parseInt(localStorage.getItem('annee')));
          this.annee = parseInt(localStorage.getItem('annee'));
          this.onSelectCompteur(this.annee);
          this.f['date_mvt'].setValue(this.transformDate(new Date()));
        }
            else if (this.service.choixmenu == 2)
            {this.service.getData(this.service.formData.value.id).subscribe(res=> {
              this.service.formData =this.fb.group(Object.assign({},res));
            this.livr = res;
             this.service.list = this.livr.llivrs;
              //this.calcul();
            });
     this.llivrService.getAll(this.service.formData.value.numero).subscribe(
     response =>{this.service.list = response;
    }
     );
     this.f['date_mvt'].setValue(this.service.formData.value.date_mvt);
   
     }
   
    this.clientService.getAll().subscribe(
      response =>{this.ClientList = response;}
     );
    }
    onSelectCompteur(id: number)
   {
    this.compteurservice.getdata(id).subscribe(
      response =>{
        this.compteur = response;
        this.code = (((1000000)* this.compteur.annee)+ this.compteur.numbl);
        this.service.formData.controls['numero'].setValue(this.code);
        this.f['numero'].setValue(this.code);
        }
     ); 
      }
      
  InfoForm() {
   
      this.service.formData = this.fb.group({
        id :null,
        annee : 0,
        numero : 0,
        date_mvt : '',
        code : 0,
        libcl: '',
        smtva : '',
        chauffeur: '',
        camion : '',
        totht : 0,
        totrem : 0,
        totfodec : 0,
        tottva : 0,
        totttc : 0,
        numfac : 0,
        llivrs :[],
        
        });
      } 
    
  ResetForm() {
        this.service.formData.reset();
    }
    
  AddData(llivrIndex,Id){  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      dialogConfig.data={llivrIndex,Id};
      this.dialog.open(AddllivrComponent, dialogConfig).afterClosed().subscribe(b10=>{
        this.calcul();
      });
    }
  
    
  onDelete(item : Llivr,Id:number,i:number){
      if(Id != null)
      this.service.formData.value.id+=Id ;
     this.service.list.splice(i,1);
     this.calcul();
     }
  
  calcul(){
    this.f['totht'].setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totht;
    }, 0));
    this.f['totrem'].setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totrem;
    }, 0));
    this.f['totfodec'].setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totfodec;
    }, 0));
    this.f['tottva'].setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.tottva;
    }, 0));
    this.f['totttc'].setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totttc;
    }, 0));   
     
     }
  validateForm(){
       this.isValid = true ;
      
       if(this.service.formData.value.id_client==0)
       this.isValid =false;
      
       else if (this.service.list.length==0)
       this.isValid =false;
       return this.isValid;
     }
  
  onSubmit(){
    
     this.f['llivrs'].setValue(this.service.list);    
        this.service.saveOrUpdate(this.service.formData.value).
        subscribe( data => {
          alert( 'Validation Faite avec Success'); 

          this.histfourservice.save(this.service.formData.value).
          subscribe( data => {
            this.toastr.success( 'historique');
            
           
           
          });
          this.router.navigate(['/llivr']);
        });
       
     }
    
  transformDate(date){
       return this.datePipe.transform(date, 'yyyy-MM-dd');
     }
  nSelectClient(code :number)
     {
      this.clientService.getData(code).subscribe(
        response =>{this.client = response;
     
            this.f['libcl'].setValue(this.client.libelle);
           this.f['code'].setValue(this.client.code);
           this.f['smtva'].setValue(this.client.smtva);
         error => 
            
        this.toastr.warning( 'Code Incorrecte ')
        }
      
      );
      }
      OnSelectClient(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['libcl'].setValue('');
       this.f['code'].setValue('');
       this.f['smtva'].setValue('')
      }
      else{
         this.f['libcl'].setValue(this.ClientList[ctrl.selectedIndex - 1].libelle);
         this.f['code'].setValue(this.ClientList[ctrl.selectedIndex - 1].code);
        this.f['smtva'].setValue(this.ClientList[ctrl.selectedIndex - 1].matfisc);
      }
    }
      generatePdf(id : number) {
        const document = this.service.getDocument(id);
        pdfMake.createPdf(document).open(); 
       }
     
  }
  