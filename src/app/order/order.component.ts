	import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

orders:any;

  constructor( public OrderService:OrderService ) { }

  ngOnInit() {
   this.OrderService.getorders().subscribe( res => {
   this.orders = res;
   });
  }

}
