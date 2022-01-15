import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit,Inject} from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { PanierService} from '../../service/panier.service';
import { LpanierService} from '../../service/lpanier.service'
import { Lpanier} from '../../model/lpanier';
import { PayementComponent} from '../../payement/payement/payement.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/service/article.service';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-lpanier',
  templateUrl: './lpanier.component.html',
  styleUrls: ['./lpanier.component.css']
})
export class LpanierComponent implements OnInit {
nom: string;

montttc :number = 0;
monttva:number = 0;
montht :number = 0;
  constructor(public service: PanierService, private matDialog: MatDialog, public articleService: ArticleService,
    private router : Router,public lpanierservice: LpanierService,
    @Inject(MAT_DIALOG_DATA)  public data: any,public userService: UserService,public fb: FormBuilder,
    public dialogRef:MatDialogRef<PayementComponent>,private datePipe: DatePipe,
    public toastr: ToastrService
 ) { }
 

  ngOnInit() {
    if(this.service.choixmenu == "M")
    { 
        this.userService.client
        this.nom = (localStorage.getItem('username'));
        this.getpanier(this.nom);
        this.lpanierservice.getAll(this.service.formDatap.value.numero).subscribe(
          response =>{this.service.list = response
            this.service.totttc=this.service.panierstocke.totttc;
      }
      
      );}
      if(this.service.choixmenu == "p"){
        this.userService.client
        this.nom = (localStorage.getItem('username'));
        this.getpanier(this.nom);
        
       
    }

     
  } 

  getpanier(nom:string){
    this.service.getpanier(nom).subscribe(
      response =>{this.service.list = response;
        this.service.panierstocke =  response
        this.service.totttc=this.service.panierstocke.totttc;
          
      this.service.formDatap =this.fb.group(Object.assign({},response));
    }
    );}


onDelete(item: Lpanier,Id:number,i:number) {
if (Id != null)
this.service.formDatap.value.id+=Id ;
this.service.list.splice(i,1);
this.lpanierservice.deleteData(Id)
.subscribe(
  data => {
    console.log(data);
    alert('Elément bien suprimé!'); 
    this.calcul1();
  },
  error => console.log(error));
    
  

}  
calcu() {
this.service.totttc = (this.service.list.reduce((prev, curr) => {
 return  prev +  (curr.qte * curr.pv);
 
}, 0));
this.service.tottht = (this.service.list.reduce((prev, curr) =>
{ return prev + ((curr.qte * curr.pv)/(100 + curr.tva))*100;
}, 0));
this.service.tottva = this.service.totttc - this.service.tottht;
this.service.montttc = this.service.totttc;
}


calcul(item :Lpanier) {
this.montttc =  ( item.pv*item.qte);
this.montht =((this.montttc /( 100 + item.tva))*100);
this.monttva = this.montttc - this.montht;

this.service.totttc = this.montttc;
this.service.tottht =this.service.tottht + this.montht;
this.service.tottva= this.service.tottva + this.monttva;


item.montttc = this.montttc;
item.montht = this.montht;
item.monttva = this.monttva;
this.service.list.push(item);}
getTotal() {
  let total = 0;
  for (var i = 0; i < this.service.list.length; i++) {
      if (this.service.list[i].pa) {
        total += this.service.list[i].pa;
        this.service.montttc = total;
      }
  }
  this.service.totttc = this.service.montttc;
}

calcul1() {
  this.service.totttc = (this.service.list.reduce((prev, curr) => {
   return  prev -  (curr.qte * 0);
   
  }, 0));
  this.service.tottht = (this.service.list.reduce((prev, curr) =>
  { return prev - ((curr.qte * 0)/(100 + curr.tva))*100;
  }, 0));
  this.service.tottva = this.service.totttc - this.service.tottht;
  this.service.montttc = this.service.totttc;
  }

 payement() {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.autoFocus = true;
   dialogConfig.disableClose = true;
   dialogConfig.width = "70%";
   this.matDialog.closeAll();
   this.matDialog.open(PayementComponent, dialogConfig);
  
 }
vider(){
  this.service.list = [];
  this.service.totttc = 0;
  this.service.tottht = 0;
  this.service.tottva = 0;
  this.service.montttc = 0;
}
viderart(){
  this.service.list = [];
  this.service.totttc = 0;}

  
    

}
