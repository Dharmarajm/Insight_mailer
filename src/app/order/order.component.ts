  import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


displayedColumns = ['id', 'amazon_order_id', 'asin', 'title','buyer_name', 'purchased_at','shipment_status'];

dataSource = new MatTableDataSource;

orders: any = [];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor( public OrderService:OrderService ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
   this.OrderService.getorders().subscribe( res => {
   this.orders = res;
   this.dataSource = new MatTableDataSource(this.orders);
   });
  }

}