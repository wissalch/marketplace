import { Component, Inject, OnInit } from '@angular/core';
import { SouscategorieService} from '../../service/souscategorie.service';
import { CategorieService} from '../../service/categorie.service';
import { ArticleService} from '../../service/article.service';
import { UserService} from '../../service/user.service';
import { FournisseurService} from '../../service/fournisseur.service';
import { PanierService} from '../../service/panier.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';

import { Categorie} from '../../model/categorie';
import { Article} from '../../model/article';
import { Souscategorie} from '../../model/souscategorie';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/model/fournisseur';

@Component({
  selector: 'app-caracteristique',
  templateUrl: './caracteristique.component.html',
  styleUrls: ['./caracteristique.component.css']
})
export class CaracteristiqueComponent implements OnInit {
  CategorieList: Categorie[];
  SouscategorieList: Souscategorie[];
  fournisseur: any={};
  article: any={};
souscategorie: any={};
wcode : string ='';
code_b: string ='';
codef: number;
userFile ;
public imagePath;
imgURL: any;
name : string;
 
  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public souscategorieService: SouscategorieService,public panierservice: PanierService,
    public categorieService: CategorieService, public fournisseurService: FournisseurService,
    public articleService: ArticleService,public userService: UserService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CaracteristiqueComponent>,
    
    ) { }
     get f() { return this.crudApi.dataForm.controls; }
   
  ngOnInit() {
    this.crudApi.getarticle(this.crudApi.dataForm.value.code).
    subscribe( response => {this.crudApi.article = response;
      this.fournisseurService.getData(this.crudApi.article.codef).subscribe(
        response =>{this.fournisseur = response;
        } 
       );
   
      
    });
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
     this.souscategorieService.getAll().subscribe(
       response =>{this.SouscategorieList = response;}
     );
    
     this.codef = parseInt(localStorage.getItem('codef'));
     this.f['codef'].setValue(this.codef);

   
   } 
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
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

    ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
   
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}

onSelectCateg(ccateg: string)
 {
this.souscategorieService.listSouscateg(ccateg).subscribe(
 response =>{this.SouscategorieList = response;} 
); 
}





onSelectSouscateg(codesous: string)
{
this.souscategorieService.getData(codesous).subscribe(
 response => {
   this.souscategorie = response;
   this.wcode = (10000 + this.souscategorie.rang).toString().substring(1);
   this.wcode =this.crudApi.dataForm.value.code_b+this.souscategorie.ccateg+this.souscategorie.code+this.wcode;
   this.crudApi.dataForm.controls['code'].setValue(this.wcode);
   this.f['code'].setValue(this.wcode);
   
 } 
);

}

   

addData() {
  const formData = new  FormData();
  const article = this.crudApi.dataForm.value;
  formData.append('article',JSON.stringify(article));
  formData.append('file',this.userFile);
  this.crudApi.createData(formData).subscribe( data => {
  this.dialogRef.close();

  if(this.userService.four){
 
    this.crudApi.getListArtf(this.codef).subscribe(
      response =>{this.crudApi.listData = response;}
    );
  }

  else{
    this.crudApi.getAll().subscribe(
response =>{this.crudApi.listData = response;}
  );
    }
    this.router.navigate(['/articles']); 
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.code,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/articles']);
    });
  }


  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.success( 'Only images are supported.');
      
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }



}
