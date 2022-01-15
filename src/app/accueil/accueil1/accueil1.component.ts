import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service';
import { Router } from '@angular/router';
import { ArticleService} from '../../service/article.service';
import { SouscategorieService } from 'src/app/service/souscategorie.service';
@Component({
  selector: 'app-accueil1',
  templateUrl: './accueil1.component.html',
  styleUrls: ['./accueil1.component.css']
})
export class Accueil1Component implements OnInit {
  name : string;
  p:number=10;
  constructor(private userService : UserService,private router : Router,public souscategorie:SouscategorieService,
    public artService: ArticleService) { }

  ngOnInit(): void {
    this.name =  localStorage.getItem('name');
    this.souscategorie.getAll().subscribe(
      response =>{this.souscategorie.listData = response;
       
    }
    );
  }
logout()
{
  
  this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.suser = false;
  this.router.navigate(['/login']);

}
addArticle()
{
  
  this.router.navigate(['/articles']);
}
}