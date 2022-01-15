import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service';
import { Router } from '@angular/router';
import { ArticleService} from '../../service/article.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  name : string;
  id;
  constructor(public userService : UserService,private router : Router,
    public artService: ArticleService) { }

  ngOnInit(): void {
    this.name =  localStorage.getItem('username');
    this.id =  localStorage.getItem('idUser');
    this.artService.getAll().subscribe(
      response =>{this.artService.listData = response;}
     );
  }
  
logout()
{
  this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.suser = false;
  this.router.navigate(['/login1']);

}
addArticle()
{
  
  this.router.navigate(['/articles']);
}

}

