import { Component, Inject, OnInit } from '@angular/core';
import { SouscategorieService} from '../../service/souscategorie.service';
import { CategorieService } from '../../service/categorie.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Souscategorie} from '../../model/Souscategorie';
import { Categorie} from '../../model/Categorie';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { createLoweredSymbol } from '@angular/compiler';




@Component({
  selector: 'app-add-souscategorie',
  templateUrl: './add-souscategorie.component.html',
  styleUrls: ['./add-souscategorie.component.css']
})
export class AddSouscategorieComponent implements OnInit {
  num : any;
  code : string;
  nom:string; 
  CategorieList: Categorie[];
  constructor(public crudApi: SouscategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddSouscategorieComponent>,  public categorieService: CategorieService,
    public userService: UserService ,
    ) { }
    get  f() { return this.crudApi.dataForm.controls }


  ngOnInit(): void {
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()
    }
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
       
    );
     }
 

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
     ccateg: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        rang: [1],
      });
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
   
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
   

addData() {
  this.crudApi.CreateData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/souscategories']); 
  });
}
  updateData()
  {
    this.crudApi.updateData(this.crudApi.dataForm.value.code,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/souscategories']);
    });
 
  }





OnSelectCateg(ctrl) {

  if (ctrl.selectedIndex == 0) {
    this.f['ccateg'].setValue('');
 }
  else {
this.code = this.CategorieList[ctrl.selectedIndex - 1].code;
this.crudApi.getNumero(this.code).subscribe(
  response => {

  this.num = response;
  if (this.num > 0)
  {
    this.code = (100000 + this.num +1).toString().substring(1);
  }
  else
  {
    this.code = (this.code+'01');
  }
  this.f['code'].setValue(this.code);
}
);
}
} 
}



