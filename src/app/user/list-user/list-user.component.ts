import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User} from '../../model/User';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from '../../service/user.service';
import { RegisterComponent } from '../../user/register/register.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  listuser: any = [];
  users: User[];
  username: string;
  nom:string;
  constructor(public crudApi: UserService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<RegisterComponent>,) { }
 
  ngOnInit() {
    this.getData();
    this.username='';
    
    this.crudApi.admin
    this.nom = (localStorage.getItem('username'));
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
  adduser()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(RegisterComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('voulez vous supprimer cet utilisateur ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          alert('utilisateur supprimé avec succés!'); 
          this.getData();
        },
        error => console.log(error));
  }
}

private search() {
  this.users = [];
  this.crudApi.getuserbynom(this.username)
    .subscribe(response => this.users = response);
}



onSubmit() {
  this.search();
}







  selectData(item : User) {
    
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="100%";
    
    this.matDialog.open(RegisterComponent, dialogConfig);
  }
  
  exportToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
    let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel '});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    
    })
    
      }



}
