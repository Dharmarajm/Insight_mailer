import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {  MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

latest_orders: any;
top_products: any;

displayedColumns1 = ['id', 'product_list', 'count'];
dataSource1 = new MatTableDataSource(ELEMENT_DATA1);

displayedColumns2 = ['id', 'name', 'order_value'];
dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

values: any = ['7 Days','15 Days','30 Days','45 Days']

  constructor(private DashboardService:DashboardService) { }

  ngOnInit() {
  this.DashboardService.lastest_order().subscribe( res => {
   this.latest_orders = res;
   });
   this.DashboardService.top_products().subscribe( res => {
   this.top_products = res;
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
    { data: [10, 10] }
  ];

  chartLabels1 = ['Red','Yellow'];

  onChart1Click(event) {
    console.log(event);
  }

   chartOptions2 = {
    responsive: true,
    fill: 'start',
    showLine: false
  };

  chartData2 = [
    { data: [330, 600, 260, 700], label: 'Account A' }
  ];

  chartLabels2 = ['January', 'February', 'Mars', 'April'];

  onChart2Click(event) {
    console.log(event);
  }

}
const ELEMENT_DATA1: any[] = [
  {id: 1, product_list: 'Hydrogen', count: 6},
  {id: 2, product_list: 'Helium', count: 5},
  {id: 3, product_list: 'Lithium', count: 4},
  {id: 4, product_list: 'Beryllium', count: 3},
  {id: 5, product_list: 'Boron', count: 2},
  {id: 6, product_list: 'Carbon', count: 1}
];

const ELEMENT_DATA2: any[] = [
  {id: 1, name: 'Hydrogen', order_value: 6},
  {id: 2, name: 'Helium', order_value: 5},
  {id: 3, name: 'Lithium', order_value: 4},
  {id: 4, name: 'Beryllium', order_value: 3},
  {id: 5, name: 'Boron', order_value: 2},
  {id: 6, name: 'Carbon', order_value: 1}
];

