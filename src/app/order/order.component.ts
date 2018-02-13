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


displayedColumns = ['id', 'amazon_order_id', 'asin', 'buyer_name', 'purchased_at','order_quantity','shipment_status','total'];

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

chartOptions = {
    responsive: true,
    fill: 'start',
    showLine: false
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  chartOptions1 = {
    responsive: true
  };

  chartData1 = [
    { data: [10, 20, 30] }
  ];

  chartLabels1 = ['Red','Yellow','Blue'];

  onChart1Click(event) {
    console.log(event);
  }

}