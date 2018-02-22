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
counts: any;

displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

displayedColumns1 = ['id', 'product_list', 'count'];
dataSource1 = new MatTableDataSource(ELEMENT_DATA1);

displayedColumns2 = ['id', 'name'];
dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

values: any = ['7 Days','15 Days','30 Days','45 Days']

  constructor(private DashboardService:DashboardService) { }

  ngOnInit() {
  this.DashboardService.count().subscribe( res => {
   this.counts = res;
   });

 this.DashboardService.top_products().subscribe( res => {
   this.top_products = res;
  // this.dataSource1 = new MatTableDataSource(this.top_products);
   });

  this.DashboardService.lastest_order().subscribe( res => {
   this.latest_orders = res;
  // this.dataSource2 = new MatTableDataSource(this.latest_orders);
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
  {id: 1, product_list: '9311122521', count: 3},
  {id: 2, product_list: '9380658745', count: 1},
  {id: 3, product_list: '1937707857', count: 1},
  {id: 4, product_list: '193770789X', count: 1},
  {id: 5, product_list: '1937707881', count: 1}
];

const ELEMENT_DATA2: any[] = [
  {id: 1, name: '1937707865'},
  {id: 2, name: '9380658745'},
  {id: 3, name: '1937707857'},
  {id: 4, name: '9311122521'},
  {id: 5, name: '9311122521'}
];

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];