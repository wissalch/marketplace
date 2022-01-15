import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from '../../service/commande.service';
import { PanierService } from '../../service/panier.service';
import { LcommandeService } from '../../service/lcommande.service';
import { UserService } from '../../service/user.service';
import { Commande } from '../../model/commande';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-list-comm',
  templateUrl: './list-comm.component.html',
  styleUrls: ['./list-comm.component.css']
})
export class ListCommComponent implements OnInit {
  list : Commande[];
  SearchText :string;
  nom: String;
  constructor(public service :CommandeService,private router:Router,private pservice :PanierService,
    private toastr :ToastrService,public fb: FormBuilder,private userService :UserService,
    private matDialog: MatDialog,public lcommservice :LcommandeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe : DatePipe) { }

  ngOnInit(){ 
    if(this.userService.client){
      this.nom = (localStorage.getItem('username'));
     
      this.getlistcomm(this.nom);
  }
  }
     
  
    
 



  getlistcomm(nom:String){
    this.service.getlistcomm(nom).subscribe(
      response =>{this.service.commande = response;
      
      this.lcommservice.getAll(this.service.commande.numero).subscribe(
        response =>{this.lcommservice.lcomm = response
          if(this.lcommservice.lcomm==[]){
            this.service.commande.tottht=0;
            this.service.commande.tottva=0;
            this.service.commande.totttc=0;

          }}
        );
       
    }
    );}


refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.list = response;}
   );

}

getData() {
  this.service.getAll().subscribe(
    response =>{this.service.list = response;}
   );
 
}
onDelete(id: number) {
  this.service.deleteData(id)
    .subscribe(
      data => {
        console.log(data);
        alert(' Bien supprimé!'); 
        //this.refreshListe();
        this.getlistcomm(this.nom);
        this.router.navigate(['/lcomm']);
    
            
      },
      error => console.log(error));
      
}
newComm()
{
  this.service.choixmenu =1
this.router.navigate(['/comm']);
}

onSelect(item :Commande){
this.service.formData = this.fb.group(Object.assign({},item));
this.service.choixmenu =2
this.router.navigate(['/comm']);
}
transformDate(date){
return this.datePipe.transform(date, 'yyyy-MM-dd');
}

}
