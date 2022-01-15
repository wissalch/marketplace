import { Component, OnInit,Inject} from '@angular/core';
import { CategorieService} from '../../service/categorie.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie} from '../../model/Categorie';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  num : any;
  code : string;
  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddCategorieComponent>
    ) { }
    get f() { return this.crudApi.dataForm.controls }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()
    this.onSelectCode()};
   }
   onSelectCode() {
this.crudApi.getNumero().subscribe(
response => {
  this.num = response;
  this.code = (1000 + this.num +1).toString().substring(1);
  this.f['code'].setValue(this.code);
 
}
);
 }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
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
    this.router.navigate(['/categories']); 
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
     // this.router.navigate(['/categories']);
    });
    this.router.navigate(['/categories']);
  }
 

}



