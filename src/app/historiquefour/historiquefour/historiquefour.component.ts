import { Component, OnInit } from '@angular/core';
import { HistoriquefourService } from 'src/app/service/historiquefour.service';
import { UserService } from 'src/app/service/user.service';
import {LivrService } from 'src/app/service/livr.service';
@Component({
  selector: 'app-historiquefour',
  templateUrl: './historiquefour.component.html',
  styleUrls: ['./historiquefour.component.css']
})
export class HistoriquefourComponent implements OnInit {
  nom:string;
  codef: number;
  nomf:string;
   listlivr : any=[];
  constructor(public historiquefourService:HistoriquefourService,public userService:UserService,
    public livrservice:LivrService) { }

  ngOnInit(){
    if(this.userService.four){
      this.codef = parseInt(localStorage.getItem('codef'));
      this. getlivrfour(this.codef);
      this.nomf=(localStorage.getItem('username'));
  }

}


getlivrfour(codef:number){
this.livrservice.getlivrfour(codef).subscribe(
  response =>{this.listlivr = response;
}
);}




getall(nom:string){
  this.historiquefourService.getall(this.nom).subscribe(
    response =>{this.historiquefourService.listhistorique = response;
  }
  );}


}