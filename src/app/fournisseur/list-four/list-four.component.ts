import { Component, Inject, OnInit } from '@angular/core';
import { FournisseurService} from '../../service/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur} from '../../model/Fournisseur';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddFourComponent } from '../../fournisseur/add-four/add-four.component';


@Component({
  selector: 'app-list-four',
  templateUrl: './list-four.component.html',
  styleUrls: ['./list-four.component.css']
})
export class ListFourComponent implements OnInit {

  list : Observable<Fournisseur[]>;
  constructor(public crudApi: FournisseurService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddFourComponent>,) { }
 
    ngOnInit(){  this.getData();
    
    }
    getData() {
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
     
    }
  
  addFour()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddFourComponent, dialogConfig);
  }

  
  selectdata(item : Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddFourComponent, dialogConfig);
  }
  

  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this fournisseur ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
 



}
 
