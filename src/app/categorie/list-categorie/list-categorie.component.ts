import { Component, OnInit,inject, Inject } from '@angular/core';
import { CategorieService } from '../../service/categorie.service';
import { UserService } from '../../service/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Categorie} from '../../model/Categorie';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } 
from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddCategorieComponent } from '../../categorie/add-categorie/add-categorie.component';



   @Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  catego
  listcategorie: any = [];
  lib:string;
 
  control: FormControl = new FormControl('');
  valid: boolean = false;
  libelle: string;
  categories: Categorie[];
  nom:string;
  constructor(public crudApi: CategorieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,public userService: UserService,
   @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,) { }
 
  ngOnInit() {
  
    this.getData();
    this.libelle = '';
    this.userService.admin
    this.nom = (localStorage.getItem('username'));
  }

  private search() {
    this.categories = [];
    this.crudApi.getcategoriebylibelle(this.libelle)
      .subscribe(response => this.categories = response);
      
  }

  onSubmit() {
    this.search();
  }








  addCategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCategorieComponent, dialogConfig);
  }
  

 
  getData() {
   this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
    
  }
  exportToExcel() {
this.crudApi.getExcelData().subscribe((responseMessage) => {
let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel '});
var fileURL = URL.createObjectURL(file);
window.open(fileURL);

})

  }

  removeData(code: string) {
    if (window.confirm('vous voulez vraiment supprimer cette Catégorie ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' catégorie supprimé avec succée!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddCategorieComponent, dialogConfig);
  }


 

}

