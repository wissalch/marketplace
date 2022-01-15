import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  import { User} from '../../model/user';
  import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { ArticleService} from '../../service/article.service';

import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-update1',
  templateUrl: './update1.component.html',
  styleUrls: ['./update1.component.css']
})
export class Update1Component implements OnInit {
  name : string;
  user:any={};
  email:string;
  username:string;
  login:string;
  role:string;
  pwd:string;

  constructor(public userService : UserService,private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog, public dialogRef:MatDialogRef<Update1Component>,
   public artService: ArticleService) { }
   get f() { return this.userService.dataform.controls}
 ngOnInit(): void {
  if (this.userService.admin){
  this.name =  localStorage.getItem('username');
   this.userService.get(this.name).subscribe(
     response =>{this.userService.user= response;
       this.userService.dataform=this.fb.group(Object.assign({},response));
     }
    );

 }
 else if (this.userService.client){
   this.name =  localStorage.getItem('username');
    this.userService.get(this.name).subscribe(
      response =>{this.userService.user= response;
        this.userService.dataform=this.fb.group(Object.assign({},response));
      }
     );
 
  }

  else if (this.userService.four){
   this.name =  localStorage.getItem('username');
    this.userService.get(this.name).subscribe(
      response =>{this.userService.user= response;
        this.userService.dataform=this.fb.group(Object.assign({},response));
      }
     );
 
  }

}
 

 infoForm() {
   this.userService.dataform = this.fb.group({
       id: null,
       username: ['', [Validators.required, Validators.minLength(5)]],
       role: ['', [Validators.required, Validators.minLength(8)]],
       email: ['', [Validators.required, Validators.minLength(8)]],
       login: ['', [Validators.required, Validators.minLength(8)]],
       pwd: ['', [Validators.required, Validators.minLength(8)]],
       pwdd: ['', [Validators.required, Validators.minLength(8)]],
       acceptTerms :  ['', [Validators.required]],
       });
   }


logout()
{
 this.userService.islogin = false;
   this.userService.admin = false;
   this.userService.suser = false;
 this.router.navigate(['/login']);

}
addArticle()
{
 
 this.router.navigate(['/articles']);
}
selectData(item : User) {
 this.userService.dataform = this.fb.group(Object.assign({},item));
 const dialogConfig = new MatDialogConfig();
 dialogConfig.autoFocus = true;
 dialogConfig.disableClose = true;
 dialogConfig.width="50%";
 
 this.matDialog.open(Update1Component, dialogConfig);
}

enregister(){
 this.userService.get(this.name).subscribe(
   response =>{this.user= response;
       this.userService.dataform=this.fb.group(Object.assign({},response));
     
     
       this.user.email=this.email;
       this.user.login=this.login;
       this.user.username=this.username;
       this.user.role=this.role;
      // this.user.active=this.active;
       this.user.pwd=this.pwd;
       this.f['email'].setValue(this.email);
this.f['login'].setValue(this.login);
this.f['username'].setValue(this.username);
this.f['role'].setValue(this.role);
this.f['active'].setValue(this.userService.user.active);
this.f['pwd'].setValue(this.pwd);      
     
this.userService.updatedata( this.userService.dataform.value.id, this.userService.dataform.value).
   subscribe( data => {
     //this.dialogRef.close();
     this.router.navigate(['/accueil']);
   });
     }
    );
   
 
}















}
