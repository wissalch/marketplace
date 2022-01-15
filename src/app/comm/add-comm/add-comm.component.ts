import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ClientService} from '../../service/client.service';

import { CompteurService} from '../../service/compteur.service';
import { Client} from '../../model/client';
import { Compteur} from '../../model/compteur';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Commande } from '../../model/commande';
import { CommandeService} from '../../service/commande.service';
import { LcommandeService } from '../../service/lcommande.service';
import { DatePipe } from '@angular/common';
import { AddLcommComponent } from '../../comm/add-lcomm/add-lcomm.component';
import { UserService} from '../../service/user.service';
import { ArticleService} from '../../service/article.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms'; 
import { Observable } from "rxjs";
import { Article} from '../../model/article';
import { Lcommande} from '../../model/lcommande';
import { formatDate } from '@angular/common';
import '@angular/localize/init';
import { PanierService} from '../../service/panier.service';
import { LpanierService} from '../../service/lpanier.service';
import { HistoriqueService} from '../../service/historique.service';
@Component({
  selector: 'app-add-comm',
  templateUrl: './add-comm.component.html',
  styleUrls: ['./add-comm.component.css']
})
export class AddCommComponent implements OnInit {
  ClientList: Client[];
  wcode: string;
  list : any=[];
  code: number;
  isValid:boolean = true;
  //articleService: any;
  Date;
  compteur : any={};
  client   : any= {};
 panier   : any= {};
  annee  = 0;
  codec: string;
nom:string;
  formData: FormGroup;
  articleList:Article[];
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  listcom: any = [];
valid: boolean = false;
  constructor(public service:CommandeService,public crudApi: CommandeService,public userService: UserService,
    public compteurservice:CompteurService,public historiqueservice:HistoriqueService,
    public lcommservice:LcommandeService,public articleService :ArticleService,
    private dialog:MatDialog,public fb: FormBuilder,private lpanierservice :LpanierService,
    public clientService :ClientService,public panierservice :PanierService,
    private toastr :ToastrService,
    private router :Router, @Inject(MAT_DIALOG_DATA)  public data,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.panierservice.formDatap.controls}
    get b() { return this.service.formData.controls}
  ngOnInit() {
    this.userService.client
      this.nom = (localStorage.getItem('username'));
      //this.getlistcomm(this.code);
      this.getpanier(this.nom);
   // {this.panierservice.getpanier(this.panierservice.formData.value.nom).subscribe(res=> {
    //  this.panierservice.formData =this.fb.group(Object.assign({},res));
    
    
    this.lpanierservice.getAll(this.panierservice.formData.value.numero).subscribe(
     response =>{this.panierservice.list = response }
     );
     this.lpanierservice.getlpanier(this.panierservice.formData.value.numero).subscribe(
      response =>{this.panierservice.listcomm = response; 
      }
    );
 // });
     this.calcul();
     //this.f['date_comm'].setValue(this.service.formData.value.date_comm);

   //  }
   this.articleService.getAll().subscribe(
      response =>{this.articleList= response;}
     );
   
 
  }




  getpanier(nom:string){
    this.panierservice.getpanier(nom).subscribe(
      response =>{this.panierservice.panierstocke = response;
        this.panierservice.formData =this.fb.group(Object.assign({},response))});
    }





  onSubmit(){
    
 
      this.service.saveOrUpdate(this.panierservice.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
       
       
       
      });
      this.historiqueservice.save(this.panierservice.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        
       
       
      });
      
     
      if(this.userService.client){
        this.nom = (localStorage.getItem('username'));
        //this.getlistcomm(this.code);
        this.panierservice.getpanier(this.nom).subscribe(
          response =>{this.panierservice.panierstocke = response;
            this.panierservice.formDatap =this.fb.group(Object.assign({},response));
        
        this.lpanierservice.getAll(this.panierservice.formDatap.value.numero).subscribe(
          response =>{this.panierservice.listpanier = response}
          );
       
          this.service.verif(this.panierservice.formDatap.value.totttc).subscribe(
            response => {
            
              this.listcom = response;
              if (this.listcom.length == 0) {
            
                this.valid = true;
                this.getpanier(this.nom);
              }
            else {
              this.valid = false;
              //this.service.formDatap.reset();
                this.panierservice.listpaniers=[];
                this.panierservice.panierstocke.totttc=0;
                this.panierservice.panierstocke.date_mvt='';
                this.panierservice.panierstocke.tottht=0;
                this.panierservice.panierstocke.tottva=0;
                // this.f['date_mvt'].setValue(this.service.panierstocke.panierstocke.date_mvt);
                this.f['tottht'].setValue(this.panierservice.panierstocke.tottht);
      this.f['tottva'].setValue(this.panierservice.panierstocke.tottva);
      this.f['totttc'].setValue(this.panierservice.panierstocke.totttc);
      this.f['lpaniers'].setValue(this.panierservice.listpaniers);
                this.panierservice.saveOrUpdate(this.panierservice.formDatap.value).subscribe(data => {
                  //this.dialogRef.close();
                   
                    this.toastr.success('validation faite avec success');
              
                    //this.router.navigate(['/listpanier']);
                    
              
                  });
                  this.lpanierservice.deleteAll(this.panierservice.formDatap.value.numero)
                  .subscribe(
                    data => {
                      //this.dialogRef.close();
                      this.toastr.warning(' data successfully deleted!'); 
                      this.router.navigate(['/lcomm']);
                    });
              //this.toastr.success('Vérifier Votre Email ..Email Déja Saisie... ');

             
            }
            }
            
            );}
            );
       
    }
     



   }
vider(){
  this.panierservice.list = [];
  this.panierservice.totttc = 0;
  this.panierservice.tottht = 0;
  this.panierservice.tottva = 0;
  this.panierservice.montttc = 0;
}
   

     
  onSelectCompteur(id: number)
  {
   this.compteurservice.getdata(id).subscribe(
     response =>{
       this.compteur = response;
       this.code = (((1000000)* this.compteur.annee)+ this.compteur.numcomm);
       this.service.formData.controls['numero'].setValue(this.code);
       this.f['numero'].setValue(this.code);
       }
    );  
  } 
 

  InfoForm() {
    this.formData = this.fb.group({
        id: null,
        numero :this.data.numero,
        qte : 0,
        pu : 0,
        tva : 0,
        totht : 0,
        tottva :0,
        totttc :0,
        libart :'',
        code :'',
        comm_id : this.data.id_commande,
        
      });
    } 


  
resetForm() {
      this.service.formData.reset();
  }

AddData(lcommandeIndex,Id){  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex,Id};
    this.dialog.open(AddLcommComponent, dialogConfig).afterClosed().subscribe(b10=>{
      this.calcul();
   
 
    });
  }

  
onDelete(item : Lcommande,Id:number,i:number){
    if(Id != null)
    this.service.formData.value.id+=Id ;
   this.service.list.splice(i,1);
   this.calcul();
   }

calcul(){
  this.f['tottht'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.totht;
  }, 0));
  this.f['tottva'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.tottva;
  }, 0));
  this.f['totttc'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.totttc;
  }, 0));   
   
   }
validateForm(){
     this.isValid = true ;
    
     if(this.service.formData.value.id_client==0)
     this.isValid =false;
    
     else if (this.service.list.length==0)
     this.isValid=false;
     return this.isValid;
   }


  
transformDate(date){
     return this.datePipe.transform(date, 'yyyy-MM-dd');
   }
   
OnSelectClient(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['nom'].setValue('');
       this.f['code'].setValue('');
      }
      else{
         this.f['nom'].setValue(this.ClientList[ctrl.selectedIndex - 1].libelle);
         this.f['code'].setValue(this.ClientList[ctrl.selectedIndex - 1].code);
      }
    }
  }
