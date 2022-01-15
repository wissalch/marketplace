import { Component, OnInit, Inject } from '@angular/core';
import { CommandeService} from '../../service/commande.service';
import { LcommandeService} from '../../service/lcommande.service';
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
  selector: 'app-listcomm-four',
  templateUrl: './listcomm-four.component.html',
  styleUrls: ['./listcomm-four.component.css']
})
export class ListcommFourComponent implements OnInit {
codef: number;
nomf:string;
  constructor(public service: CommandeService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,public panierservice:PanierService,
    private matDialog: MatDialog,public userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,public lcommservice: LcommandeService,
    public dialogRef:MatDialogRef<AddArticleComponent>, private datePipe : DatePipe) { }

  ngOnInit() {

    if(this.userService.four){
      this.codef = parseInt(localStorage.getItem('codef'));
      
      //this.getlistcomm(this.code);
      this. getcommfour(this.codef);
      this.nomf = (localStorage.getItem('username'));
  }
  }


  

  getcommfour(codef:number){
    this.lcommservice.getcommfour(codef).subscribe(
      response =>{this.lcommservice.listfour = response;
        this.lcommservice.formData =this.fb.group(Object.assign({},response));
    }
    );}


    removeData(id: number) {
      if (window.confirm('voulez vous supprimer cette commande?')) {
       this.lcommservice.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning('commande supprimé!'); 
            this.getcommfour(this.codef);
          },
          error => console.log(error));
    }
    }
}
