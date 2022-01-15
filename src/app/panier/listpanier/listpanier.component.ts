import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PanierService} from '../../service/panier.service';
import { LpanierService} from '../../service/lpanier.service'
import { UserService} from '../../service/user.service'
import { Panier} from '../../model/panier'
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import { CompteurService} from '../../service/compteur.service'
import { CommandeService} from '../../service/commande.service'
import { AddPanierComponent } from '../../panier/add-panier/add-panier.component';
import { LpanierComponent} from '../../panier/lpanier/lpanier.component';
@Component({
  selector: 'app-listpanier',
  templateUrl: './listpanier.component.html',
  styleUrls: ['./listpanier.component.css']
})
export class ListpanierComponent implements OnInit {
p = 1;
Liste;
SearchText: string;
nom: string;
listcom: any = [];
valid: boolean = false;
  constructor(public lpanierservice: LpanierService ,public commservice: CommandeService ,
    public service: PanierService , private router: Router,
    private toastr: ToastrService, public fb: FormBuilder,public userService:UserService,
    private datePipe: DatePipe, public DecimalPipe: DecimalPipe,
    private matDialog: MatDialog,public dialogRef:MatDialogRef<LpanierComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: any) { }
    get f() {return this.service.formDatap.controls; }
  ngOnInit(): void {
  //  this.getAll();

  if(this.userService.client){
    this.nom = (localStorage.getItem('username'));
    //this.getlistcomm(this.code);
    this.service.getpanier(this.nom).subscribe(
      response =>{this.service.panierstocke = response;
        this.service.formDatap =this.fb.group(Object.assign({},response));
    
    this.lpanierservice.getAll(this.service.formDatap.value.numero).subscribe(
      response =>{this.service.listpanier = response}
      );
   
     }
        );
   
}
 }
getAll(){
  this.service.getAll().subscribe(
    response =>{this.Liste = response;}
  );


 
}


verif() {

  this.commservice.verif(this.service.formDatap.value.comm).subscribe(
  response => {
  
    this.listcom = response;
    if (this.listcom.length == 0) {
  
      this.valid = true;
      this.service.formDatap.reset();
    }
  else {
    this.valid = false;
    this.getpanier(this.nom);
    //this.toastr.success('Vérifier Votre Email ..Email Déja Saisie... ');
  }
  }
  
  );
  }

getpanier(nom:string){
  this.service.getpanier(nom).subscribe(
    response =>{this.service.panierstocke = response;
      this.service.formDatap =this.fb.group(Object.assign({},response));
  }
  );
  this.lpanierservice.getAll(this.service.formDatap.value.numero).subscribe(
    response =>{this.service.listpanier = response}
    );
}


getcomm(nom:string){
  this.commservice.getcomm(nom).subscribe(
    response =>{this.commservice.commstocke = response;
     // this.service.formDatap =this.fb.group(Object.assign({},response));
  }
  );
 
}


  selectData(item : Panier) {
    this.service.choixmenu = "M";
    this.service.formData= this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="70%";
    
    this.matDialog.open(LpanierComponent, dialogConfig);
  }

transfomDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}


  
 





}
