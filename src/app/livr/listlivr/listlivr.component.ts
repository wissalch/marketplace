import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LivrService } from '../../service/livr.service';
import { UserService } from '../../service/user.service';
import { Livr } from '../../model/livr';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {pdfMake} from 'pdfmake/build/pdfmake';
import { map } from 'rxjs/operators';
import {pdfFonts} from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-listlivr',
  templateUrl: './listlivr.component.html',
  styleUrls: ['./listlivr.component.css']
})
export class ListlivrComponent implements OnInit {
  codef: number;
  list : Livr[];
   listlivr : any=[];
  SearchText :string;
  nomf:string;
  constructor( private service :LivrService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,public userService :UserService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe : DatePipe) { }


  ngOnInit(): void {
    this.getData();
    if(this.userService.four){
      this.codef = parseInt(localStorage.getItem('codef'));
      //this.getlistcomm(this.code);
      this. getlivrfour(this.codef);
      this.nomf = (localStorage.getItem('username'));
    
  }
    
  }
  getlivrfour(codef:number){
    this.service.getlivrfour(codef).subscribe(
      response =>{this.listlivr = response;
        this.service.formData =this.fb.group(Object.assign({},response));
    }
    );}



getData(){
  this.service.getAll().subscribe(
    response =>{this.list = response;}
   );

}

  
  onDelete(id: number) {
    if (window.confirm('voulez vous supprimer cette livraison?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            // console.log(data);
            this.toastr.success(' livraison supprimé avec succés!'); 
            this.getData();
          },
          error => console.log(error));
    }
  }
  
  newlivr()
  {
    this.service.choixmenu = 1
    this.router.navigate(['/livr']);
  }
 

onSelect(item : Livr){
  this.service.formData = this.fb.group(Object.assign({},item));
  
  this.service.choixmenu = 2;
  this.router.navigate(['/livr']);
  
}

transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}
generatePdf(id : number) {
  const document = this.service.getDocument(id);
  pdfMake.createPdf(document).open(); 
 }
}
