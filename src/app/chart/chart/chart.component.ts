import { Component, OnInit } from '@angular/core';
import  {ChartOptions,ChartType,ChartDataSets} from 'chart.js';
import { ChartsModule,Label } from 'ng2-charts';
import { SouscategorieService } from 'src/app/service/souscategorie.service';
import { CategorieService } from 'src/app/service/categorie.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'Average annual software developer salary';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  barChartOptions1: ChartOptions = {
    responsive: true,
  };
  barChartLabels1: Label[];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartPlugins1 = [];

  barChartData1: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '' }
  ];

  constructor(public souscategorieService: SouscategorieService,public categorieService: CategorieService) {}

  ngOnInit() {

this.souscategorieService.getall().subscribe(data=> {
  this.barChartLabels = data.map(item=>item.libelle);
  this.barChartData =  [
    { data: data.map(item=>item.rang), label: 'nombre article' }
  ];

});


this.categorieService.getAll().subscribe(data=> {
  this.barChartLabels1 = data.map(item=>item.libelle);
  this.barChartData1 =  [
    { data: data.map(item=>item.rang), label: 'nombre article' }
  ];

});




  }



}