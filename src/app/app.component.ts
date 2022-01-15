import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'premierproj';
  constructor(private router : Router){}
  ngOnInit() {
   
  }

}