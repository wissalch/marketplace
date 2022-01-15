import { Component, OnInit,Inject } from '@angular/core';
import { SouscategorieService} from '../../service/souscategorie.service';
import { UserService} from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Souscategorie} from '../../model/Souscategorie';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddSouscategorieComponent } from '../../souscategorie/add-souscategorie/add-souscategorie.component';



@Component({
  selector: 'app-list-souscategorie',
  templateUrl: './list-souscategorie.component.html',
  styleUrls: ['./list-souscategorie.component.css']
})
export class ListSouscategorieComponent implements OnInit {
  libelle: string;
  souscategories: Souscategorie[];
  souscategorie : Souscategorie;
  nom:string;
  control: FormControl = new FormControl('');
  constructor(public crudApi: SouscategorieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddSouscategorieComponent>,) { }
 
  ngOnInit() {
    this.userService.admin
    this.nom = (localStorage.getItem('username'));

    this.getData();
    this.libelle = '';
  }

  private search() {
    this.souscategories = [];
    this.crudApi.getsouscategoriebylibelle(this.libelle)
      .subscribe(response => this.souscategories = response);
  }

  onSubmit() {
    this.search();
  }





  addSouscategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddSouscategorieComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
  
  removeData(code: string) {
    if (window.confirm(' voulez vous vraiment supprimer cette Catégorie ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' catégorie supprimé avec succés!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Souscategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddSouscategorieComponent, dialogConfig);
  }

  exportToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
    let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel '});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    
    })
    
      }
}