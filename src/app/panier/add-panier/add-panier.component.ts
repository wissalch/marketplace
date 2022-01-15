import { Component, OnInit,Inject} from '@angular/core';
import { ArticleService} from '../../service/article.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Article} from '../../model/article'
import { Panier} from '../../model/panier'
import { Lpanier} from '../../model/lpanier'
import { PanierService} from '../../service/panier.service';
import { LpanierService} from '../../service/lpanier.service';
import { FournisseurService} from '../../service/fournisseur.service';
import { UserService} from '../../service/user.service'
import {DecimalPipe} from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable} from 'rxjs';
import { LpanierComponent} from '../../panier/lpanier/lpanier.component';
import { ListArticleComponent } from '../../article/list-article/list-article.component';
import { CaracteristiqueComponent } from '../../article/caracteristique/caracteristique.component';

import { AddArticleComponent } from 'src/app/article/add-article/add-article.component';
@Component({
  selector: 'app-add-panier',
  templateUrl: './add-panier.component.html',
  styleUrls: ['./add-panier.component.css']
})
export class AddPanierComponent implements OnInit {
lpanier : Lpanier;
fournisseur:any={};
qte: number = 0;
nouveauQte: number;
montant: number = 0;
nom:string;
article : Article;
format = '1.2-2';
montttc :number = 0;
monttva:number = 0;
montht :number = 0;
libelle: string;
articles: Article[];
  constructor(public crudApi: ArticleService ,public fourservice: FournisseurService ,
    public fb: FormBuilder,public toastr: ToastrService,
    public panierService: PanierService, private matDialog: MatDialog, public userService: UserService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data: any,
    public lpanierservice: LpanierService,public fbb: FormBuilder,
    public dialogRef:MatDialogRef<LpanierComponent>,public decimalPipe: DecimalPipe
    ) { }
    get f() { return this.crudApi.dataForm.controls}
  ngOnInit() {
(this.panierService.choixmenu='A');{
    if(this.userService.client){
      this.nom = (localStorage.getItem('username'));
      this.getpanier(this.nom);
      this.panierService.totttc = 0;
      this.panierService.choixmenu == "p";
       this.panierService.list=[];
       this.InfoForm();
     
  }
  this.crudApi.getAll().subscribe(
    response =>{this.crudApi.listData = response;}
   );
} 
this.libelle = '';
this.qte = 0;
  }

  getarticle(code:string) {
    this.crudApi.getarticle(code).subscribe(
      response =>{this.crudApi.Article = response;
        this.crudApi.dataForm =this.fbb.group(Object.assign({},response));
        if(this.crudApi.Article.stk_init ==0){alert('proquit expiré');}
       else if(this.crudApi.Article.stk_init<this.qte){alert('vous avez depasser le quantité disponible');}
        else{
       this.nouveauQte=(this.crudApi.Article.stk_init)-(this.qte);

       this.f['stk_init'].setValue(this.nouveauQte);
       // this.crudApi.Article.qte= (localStorage.getItem('this.nouveauQte'));
       this.crudApi.updatedata(this.crudApi.dataForm.value.code,this.crudApi.dataForm.value).
       subscribe( data => {
        this.toastr.success('validation faite avec success');
      }
          );}
      
    })
   
  }


  info() {
    this.crudApi.dataForm = this.fbb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        pa: ['', [Validators.required]],
        pv: ['', [Validators.required]],
        tva: ['', [Validators.required]],
        fodec: ['', [Validators.required]],
        stk_init: ['', [Validators.required]],
        ccateg: ['', [Validators.required]],
        codesous: ['', [Validators.required]],
        code_b: ['', [Validators.required]],
        fileName: ['', [Validators.required]],
        
        codef : [''],
      });
    }




  private search() {
    this.articles = [];
    this.crudApi.getarticlesbylibelle(this.libelle)
      .subscribe(response => this.articles = response);
  }
  
  onSubmit() {
    this.search();
  }


  getpanier(nom:string){
    this.panierService.getpanier(nom).subscribe(
      response =>{this.panierService.listdata = response;
       this.panierService.formData =this.fb.group(Object.assign({},response));
    }
    ); if (this.panierService.listdata==[]){
      this.InfoForm();

    }
  }

    panier()
   {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.autoFocus = true;
   dialogConfig.disableClose = true;
   dialogConfig.width="100%";
   this.matDialog.open(LpanierComponent, dialogConfig);}
  
    




InfoForm() {
  this.panierService.formDatap = this.fb.group({
    id :null,
    numero : '',
    date_mvt : '',
    nom : '',
    adresse: '',
    tottht : 0,
    tottva : 0,
    totttc : 0,
    lpaniers :[],
    });
  } 


addToCart(item :Lpanier,code:string)
 {

  this.crudApi.getarticle(code).subscribe(
    response =>{this.crudApi.Article = response;
      this.crudApi.dataForm =this.fbb.group(Object.assign({},response));
      if(this.crudApi.Article.stk_init ==0){
      this.montttc =0;
      this.montht =0;
      this.monttva =0;}
     else if(this.crudApi.Article.stk_init<this.qte){
      this.montttc =0;
      this.montht =0;
      this.monttva =0;
     }
      else{
  this.montttc =  ( item.pv*item.qte);
  this.montht =((this.montttc /( 100 + item.tva))*100);
  this.monttva = this.montttc - this.montht;
  this.panierService.totttc =this.panierService.totttc + this.montttc;
  this.panierService.tottht =this.panierService.tottht + this.montht;
  this.panierService.tottva= this.panierService.tottva + this.monttva;
  this.panierService.montttc= this.panierService.montttc + this.montttc;

item.montttc = this.montttc;
item.montht = this.montht;
item.monttva = this.monttva;
this.panierService.list.push(item);

      }})
   
 }

// Show(item : Article){}

Show(item : Article) {
  this.crudApi.choixmenu = "c";
  this.crudApi.dataForm = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="40%";
  
  this.matDialog.open(CaracteristiqueComponent, dialogConfig);
}
 getData() {
this.crudApi.getAll().subscribe(
  response =>{this.crudApi.listData = response;
    this.crudApi.article = response;}
);



 }



 
 }









