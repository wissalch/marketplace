import { Component, OnInit ,Inject } from '@angular/core';
import { UserService} from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
submitted = false;

userFile;
public imagePath;
imgURL: any;
  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router ,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<RegisterComponent>
    ) { }

  ngOnInit() {
    //if (this.crudApi.choixmenu == "A")
    {this.infoForm()
    }
   
    
   }
get f(){return this.crudApi.dataForm.controls;}
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.minLength(8)]],
        login: ['', [Validators.required, Validators.minLength(8)]],
        pwd: ['', [Validators.required, Validators.minLength(8)]],
        pwdd: ['', [Validators.required, Validators.minLength(8)]],
        acceptTerms :  ['', [Validators.required]],
        });
    }
   
  

    onReset() {
    this.submitted = false;
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    if (this.crudApi.dataForm.value.pwd == this.crudApi.dataForm.value.pwdd) {

      if (this.crudApi.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updatedata()
      }
    } 
    else
    {
      alert( 'Vérifier votre de passe ...');  
    }
}
  


addData() {
//const formData = new FormData();
// const users = this.crudApi.dataForm.value;
// formData.append('user', JSON.stringify(users));
// formData.append('file',this.userFile);

this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    alert('validation faite avec success');
   
    
      this.router.navigate(['/login1'])
    });
}

  updatedata()
  {  
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success('Mofidicatte avec success');
  
     
      this.router.navigate(['/user']);
    });
  }


  
 login() {
    this.router.navigate(['/login']);}
    register() {
      this.router.navigate(['/register']);}

      nSelectFile(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.userFile = file;
          // this.f['profile'].setValue(file);
    
          var mimeType = event.target.files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            this.toastr.success('Only images are supported.');
    
            return;
          }
          var reader = new FileReader();
          this.imagePath = file;
          reader.readAsDataURL(file);
          reader.onload = (_event) => {
            this.imgURL = reader.result;
          }
        }}







        onSelectFile(event) {
if (event.target.files.length > 0) {
const file = event.target.files[0];
  this.userFile = file;

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.toastr.success('Only images are supported.');
    return;
  }
var reader = new FileReader();
this.imagePath = file;
reader.readAsDataURL(file);
reader.onload = (_event) => {
  this.imgURL = reader.result;
}

}

        }

      }

