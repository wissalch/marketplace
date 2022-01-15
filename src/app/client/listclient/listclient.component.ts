import { Component, Inject, OnInit } from '@angular/core';
import { ClientService} from '../../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Client} from '../../model/Client';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig } from "@angular/material/dialog";
import { AddCategorieComponent } from '../../categorie/add-categorie/add-categorie.component';
import { AddClientComponent } from '../../client/addclient/addclient.component';
import { SocieteService} from '../../service/societe.service';
@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {

  client : Client;
  listData : Observable<Client[]>;
ste: any={};
wcode: string;
get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: ClientService, public toastr: ToastrService,private router
     : Router,public fb: FormBuilder,  private matDialog: MatDialog,private steService : SocieteService,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef:MatDialogRef<AddClientComponent>,
    ) { }

     ngOnInit() {
this.getData();

     }


     getData() {
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
     
    }

  removeData(code: string) {
    if (window.confirm('are sure you want to delete this Client ?')) {
      this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }

selectData(item : Client) {
  this.crudApi.choixmenu = "M";
  this.crudApi.dataForm = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddClientComponent, dialogConfig);
}

addclient()
{
  this.crudApi.choixmenu = "A";
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  this.matDialog.open(AddClientComponent, dialogConfig);
}

}
