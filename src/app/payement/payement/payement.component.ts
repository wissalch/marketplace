import { Component, OnInit, Inject } from '@angular/core';
import {  ArticleService} from '../../service/article.service'
import { PanierService} from '../../service/panier.service'
import {LpanierService } from '../../service/lpanier.service'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { CompteurService } from '../../service/compteur.service'
import { ClientService } from '../../service/client.service'
import { UserService } from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Client} from '../../model/client';
import { MatDialogRef , MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ListpanierComponent} from '../../panier/listpanier/listpanier.component';
@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {

  constructor(public service: PanierService , public Articleservice: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
     private datePipe: DatePipe ,@Inject(MAT_DIALOG_DATA)  public data: any,public userService: UserService,
     public dialogRef:MatDialogRef<ListpanierComponent>, public clientService :ClientService,public panierService: PanierService ,
     public lpanierservice: LpanierService , private router : Router, public compteurservice: CompteurService) 
    { }
compteur: any = {};
annee  = 0;
Date;
wcode: string;
numero;
ClientList: Client[];
nom:string;
valid:boolean;
get f() {return this.service.formDatap.controls; }
  ngOnInit(): void {
  
   if(this.userService.client){
    this.nom = (localStorage.getItem('username'));
    this.getpanier(this.nom);
    this.panierService.choixmenu == "p";
     // this.annee = parseInt(localStorage.getItem('annee'));
   this.Date = this.transformDate(new Date(Date.now()));
   this.annee = (this.Date).toString().substring(0,4);
   this.onSelectCompteur(this.annee);
   
}
this.valid=false;

  }
  getpanier(nom:string){
    this.service.getpanier(nom).subscribe(
      response =>{this.service.panierstocke = response;
        this.service.listdata =  response;
        this.service.formDatap =this.fb.group(Object.assign({},response));
    }
    );
  }

infoForm(){
  this.service.formDatap = this.fb.group({
    id: null,
    numero: ['', [Validators.required]],
    annee: ['', [Validators.required]],
    date_mvt: ['', [Validators.required]],
    nom: ['', [Validators.required, Validators.minLength(8)]],
    adresse: ['', [Validators.required, Validators.minLength(8)]], 
    sadresse: ['', [Validators.required, Validators.minLength(8)]],
    ville: ['', [Validators.required, Validators.minLength(8)]],
    codep: ['', [Validators.required, Validators.minLength(8)]],
    tel: ['', [Validators.required, Validators.minLength(8)]],
    tel1: ['', [Validators.required, Validators.minLength(8)]],
    tottht: [''],
    tottva: [''],
    totttc: [''],
    modreg: [''],
    numcarte: [''],
    lpaniers: [''],
  });
}
valider(){
 
  this.f['annee'].setValue(this.service.annee);
  this.f['date_mvt'].setValue(this.transformDate(new Date()));
  //this.f['nom'].setValue(this.service.nom);
  this.f['tottht'].setValue(this.service.tottht+this.service.panierstocke.tottht);
  this.f['tottva'].setValue(this.service.tottva+this.service.panierstocke.tottva);
  this.f['totttc'].setValue(this.service.totttc+this.service.panierstocke.totttc);
  this.f['lpaniers'].setValue(this.service.list);
 
 { if(this.valid==true){
  this.service.saveOrUpdate(this.service.formDatap.value).subscribe(data => {
    this.dialogRef.close();
     
      alert('validation faite avec success');

      this.router.navigate(['/listpanier']);


    });}
    else{alert('verifier votre paiement');}
}   
 
}
viderart(){
  this.service.list = [];
  this.service.totttc = 0;
 
}


ResetForm() {
  this.Articleservice.DataForm.reset();
  this.panierService.totttc =0;
}

transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}

onSelectCompteur(id:number) {;
  this.service.getpanier(this.nom).subscribe(
    response =>{this.service.panierstocke = response;

      if(this.service.panierstocke.numero==0){
        
        this.compteurservice.getdata(id).subscribe(
          response => { 
            this.compteur = response;
            
            this.wcode = (((1000000)* this.compteur.annee)+ this.compteur.numpanier).toString();
           this.service.panierstocke.numero = this.wcode;
            this.service.formDatap.controls['numero'].setValue(this.wcode);
            this.f['numero'].setValue(this.wcode);
          });
        }
    
      else{this.service.formDatap.controls['numero'].setValue(this.service.panierstocke.numero);
    
      }
      
  }
  );
 
}


OnSelectClient(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['nom'].setValue('');
      }
      else{
         this.f['nom'].setValue(this.ClientList[ctrl.selectedIndex - 1].libelle);
      }
    }


onSelectmodreg(id :number)
{
  if (id == 1)
  { this.f['modreg'].setValue('paypal');
  this.valid=true;
  this.router.navigate(['/paypal']);
  }
  else if (id == 2 )
  {
    this.f['modreg'].setValue('credit card');
    this.valid=true;
}
else if (id == 3 ) {
  this.f['modreg'].setValue('E-Dinar Poste');
  this.valid=true;
}
else{
  this.f['modreg'].setValue('a la Livraison' );
  this.valid=true;
}
}
}


