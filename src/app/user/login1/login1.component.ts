import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
import { DatePipe }from '@angular/common';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css'],
  styles: [`
    :host >>> .alert {
      color: #99004d;
      background-color: #f169b4;
      border-color: #800040;
    }
  `]
})
export class Login1Component implements OnInit {

 
 
 
  user: any={};
  
  errorMessage:string;  
  username : string;  
 login : string;
  Wdate;
  annee : 0;
  loginForm:  FormGroup; 
  pwd: string;
  password: string;
  constructor(private router:Router,private userService : UserService,
    public toastr: ToastrService,private datePipe : DatePipe,public fb: FormBuilder) { }    
  ngOnInit() {    
     this.userService.islogin = false;
     this.userService.admin = false;
     this.userService.suser = false;
     this.loginForm = this.fb.group({
       'username': [null, Validators.required],
       'password': [null, Validators.required],
     });
  } 
  
  



  
 // Login() {
   
   // this.userService.Login(this.name).subscribe(
     // response =>{this.user = response; 

        
      //  if(this.user.pwd == this.password)
       

     //   if (this.user.role  == "Admin")
     //    {
     //    this.router.navigate(['/articles']);
     // }
     // else
    // {this.router.navigate(['/article']);
    //  }
     //     }
       //   else{
       //     this.toastr.warning('Mot de passe incorrecte')}
      //  },
       //   error => 
          
        //    this.toastr.warning( 'Login Incorrecte ')
         
   // ); 
        
    //    }
    Login() {

      this.userService.Login(this.username).subscribe(
        res =>{

          this.user = res;
          if(this.user.pwd == this.password){
          
            localStorage.setItem("username", this.user.nom);
            localStorage.setItem("codef", this.user.code);
            localStorage.setItem("role", this.user.role);
            this.userService.islogin = true;
            if(this.user.role == 'Admin')
            {
              this.userService.admin = true;
              this.router.navigate(['/accueil']);
            }
            else if (this.user.role = 'fournisseur'){
              this.userService.four = true;
              this.router.navigate(['/articles']);
            }
          }
          else {this.toastr.warning('mot de passe incorrecte')}

        }, 
        error =>
               this.toastr.warning('login incorrecte')
        );
        
      }
      loginn() {
        this.router.navigate(['/login']);}
     
        register() {
          this.router.navigate(['/register']);}
        
        logOut() {
          localStorage.removeItem("username");
        }
 


  /*  onFormSubmit(form: NgForm) {
      this.authService.login(form)
        .subscribe(res => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['products']);
          }
        }, (err) => {
          console.log(err);
        });
    }

*/

    transformDate(date){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('nom');
      
  }
  inscrire(){
    this.router.navigate(['/client'])
  }

}                                                     


