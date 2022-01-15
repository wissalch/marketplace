import { Component, Inject, OnInit } from '@angular/core';
import { CommandeService} from '../../service/commande.service';
import { PanierService} from '../../service/panier.service';
import { ToastrService } from 'ngx-toastr';
import { Panier} from '../../model/panier';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-list-lcomm',
  templateUrl: './list-lcomm.component.html',
  styleUrls: ['./list-lcomm.component.css']
})
export class ListLcommComponent implements OnInit {
  code: string;
  nom: string;
  compteur : any={};
  annee  = 2021;
  Date;
  
  constructor(public service: CommandeService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,public panierservice:PanierService,
    private matDialog: MatDialog,public userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddArticleComponent>, private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls}
  ngOnInit() {
    if(this.userService.client){
      this.nom = (localStorage.getItem('username'));
      //this.getlistcomm(this.code);
      this.getcomm(this.nom);
  }
  }

  



  getcomm(nom:string){
    this.service.getcomm(nom).subscribe(
      response =>{this.service.commstocke = response;
        this.service.formData =this.fb.group(Object.assign({},response));
    }
    );}

  
    onSelect(item : Panier){
      this.service.formData = this.fb.group(Object.assign({},item));
      
      this.service.choixmenu = 2;
      this.router.navigate(['/comm']);
      
    }

}
