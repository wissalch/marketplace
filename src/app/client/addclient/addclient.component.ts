import { Component, Inject, OnInit } from '@angular/core';
import { ClientService} from '../../service/client.service';
import { CompteurService} from '../../service/compteur.service';
import { PanierService} from '../../service/panier.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } 

from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocieteService} from '../../service/societe.service';
import { UserService} from '../../service/user.service';
import { Router } from '@angular/router';
import { Client } from '../../model/Client';
import { Observable } from "rxjs";

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddClientComponent implements OnInit {
  ste: any= {};
  compteur: any= {};
  wcode: string;
listUser: any = [];
valid: boolean = false;
annee  = 0;
Date;
listData : Observable<Client[]>;
  get f() { return this.crudApi.dataForm.controls }
constructor(public crudApi: ClientService ,public fb: FormBuilder,private router
  : Router, private userService : UserService,private steService : SocieteService, @Inject(MAT_DIALOG_DATA) public data, 
   public toastr: ToastrService,  public dialogRef:MatDialogRef<AddClientComponent>,private datePipe: DatePipe ,
   public panierservice: PanierService ,public compteurservice: CompteurService  ) {}

  ngOnInit()  {
    if (this.crudApi.choixmenu == "A")
    {this.infoForm();

    this.wcode = (41000).toString()//.substring(1);
    this.crudApi.dataForm.controls['code'].setValue(this.wcode);
    this.f['code'].setValue(this.wcode);

this.verif();
    }

  }

  



  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
    libelle: ['',[Validators.required]],
    code: ['',[Validators.required]],
   adresse: ['',[Validators.required, Validators.minLength(5)]],
   tel: ['',[Validators.required, Validators.minLength(8)]],
   email: ['',[Validators.required, Validators.minLength(10)]],
   pwd: ['',[Validators.required, Validators.minLength(8)]],
 
})

}
ResetForm() {
this.crudApi.dataForm.reset();
}
onSubmit() {
  
  if (this.crudApi.choixmenu == "A")
  { this.verif();
    if(this.valid){
      this.addData();
      this.router.navigate(['/login']);
    }
    else{alert('validation imposible vérifier votre mail!');}
  }

else
 {
   this.updateData()
   this.dialogRef.close();

 }
 

}



addData() {
this.crudApi.createData(this.crudApi.dataForm.value).
subscribe(  data => {
  this.dialogRef.close();

this.crudApi.getAll().subscribe(
  response =>{this.crudApi.listData = response;}
);

});
}


updateData()
{
  this.crudApi.updatedata(this.crudApi.dataForm.value.code,this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
 
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
     
    this.router.navigate(['/clients']);
  });
}





getData() {
  this.listData = this.crudApi.getAll();
     }
verif() {

this.userService.verifEmail(this.crudApi.dataForm.value.email).subscribe(
response => {

  this.listUser = response;
  if (this.listUser.length == 0) {

    this.valid = true;
  }
else {
  this.valid = false;
  alert('Vérifier Votre Email ..Email Déja Saisie... ');
}
}

);
}
}















