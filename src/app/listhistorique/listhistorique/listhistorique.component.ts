import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from 'src/app/service/historique.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-listhistorique',
  templateUrl: './listhistorique.component.html',
  styleUrls: ['./listhistorique.component.css']
})
export class ListhistoriqueComponent implements OnInit {
nom:string;
  constructor(public historiqueService:HistoriqueService,public userService:UserService) { }

  ngOnInit(){
     if(this.userService.client){
      this.nom = (localStorage.getItem('username'));

      this.getall(this.nom);
  }
    
  }

  getall(nom:string){
    this.historiqueService.getall(this.nom).subscribe(
      response =>{this.historiqueService.listhistorique = response;
    }
    );}

}
