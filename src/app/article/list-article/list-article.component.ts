import { Component, Inject, OnInit } from '@angular/core';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article} from '../../model/article';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Categorie} from '../../model/categorie';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';
import { UserService } from 'src/app/service/user.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { CaracteristiqueComponent } from '../../article/caracteristique/caracteristique.component';
@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
fournis : any={};
artf : any={};
  article : Article;
 codef: number;
 libelle: string;
 articles: Article[];
 nomf:string;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ArticleService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,public categservice:CategorieService,
    private matDialog: MatDialog,public userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddArticleComponent>,) { }
 
  ngOnInit() {
    if(this.userService.four){
      this.codef = parseInt(localStorage.getItem('codef'));
      this.getlistArtf(this.codef);
      //this.getfour(this.codef)
      this.nomf = (localStorage.getItem('username'));
    }else{
    this.getData();
this.libelle = '';
    
  }
  }
  exportToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
    let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel '});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    
    })
  }    

  getlistArtf(code:number){
  this.crudApi.getListArtf(code).subscribe(
    response =>{this.crudApi.listData = response;
     
  }
  );

 
}
private search() {
  this.articles = [];
  this.crudApi.findarticle(this.libelle,this.codef)
    .subscribe(response => this.articles = response);
}

onSubmit() {
  this.search();
}




//getfour(code:number){
  //this.userService.getdata(this.codef).subscribe(
    //response =>{
      //this.fournis = response;
      //this.crudApi.nomf = this.fournis.nom
     
 // });}


  addArticle()
  {
    this.crudApi.choixmenu = "A";
    this.router.navigate(['/article']);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;
      }
     );
   
  }
  
 
  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  
  selectData(item : Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
 
    this.router.navigate(['/article']);
    
  }



  caracteristique(item : Article) {
    this.crudApi.choixmenu = "c";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    
    this.matDialog.open(CaracteristiqueComponent, dialogConfig);
  }




}

