import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
@ViewChild('paypal',{static : true}) paypalElement: ElementRef;
  constructor(public toastr: ToastrService) { }

  ngOnInit(): void {
   window.paypal.Buttons(
{
  style : {
    layout : 'horizontal'
  },
  CreateOrder : (data , actions) =>{

    return actions.order.create({

      purchase_units :[
        {
          amount : '1000',
          currency_code : 'USD',
        }
      ]
    })
  },
  onApprouve : (data, actions)=> {
  return actions.order.capture().then(details =>{
this.toastr.success('Payement effectué Avec success ...');

  })
}, 
onError : error =>
{console.log(error);}
  }
 ).render(this.paypalElement.nativeElement)
  }

}
