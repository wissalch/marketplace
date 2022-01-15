import { Component, OnInit,Inject } from '@angular/core';
import { FournisseurService} from '../../service/fournisseur.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { Router } from '@angular/router';
import { Fournisseur} from '../../model/fournisseur';
import { SocieteService} from '../../service/societe.service';

import { UserService} from '../../service/User.service';

import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-add-four',
  templateUrl: './add-four.component.html',
  styleUrls: ['./add-four.component.css']
})
export class AddFourComponent implements OnInit {
  ste : any={};
  wcode: string;
  listUser: any = [];
valid: boolean = false;
  get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: FournisseurService,private userService : UserService ,
     private steService : SocieteService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, public dialogRef:MatDialogRef<AddFourComponent>
    ,@Inject(MAT_DIALOG_DATA)  public data,) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm();
      this.steService.getData(1).subscribe(
        response =>{
          this.ste = response;
      
          this.wcode = (400000 + this.ste.numf).toString()//.substring(1);
          this.crudApi.dataForm.controls['code'].setValue(this.wcode);
          this.f['code'].setValue(this.wcode);
        }
      
        );  };


    }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        libelle: ['', [Validators.required]],
        code: ['',[Validators.required]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.minLength(10)]],
        pwd: ['', [Validators.required, Validators.minLength(8)]],
        fax: ['', [Validators.required, Validators.minLength(8)]],
    
        });
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
  { this.verif();
    if(this.valid){
      this.addData();
      this.router.navigate(['/login'])
    }
    else{alert('validation imposible vérifier votre mail!');}
  }

else
 {
   this.updateData();
   this.dialogRef.close();
 }}
  
  

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
    
  
  this.crudApi.getAll().subscribe(
    response =>{this.crudApi.listData = response;}
  );
  this.router.navigate(['/fournisseurs']);
  });
  }
  

  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/fournisseurs']);
    });
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



  