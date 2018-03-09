import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AppService } from './../app.service';
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
order_statistics: any;
review: any;
happy_customer: any;
unhappy_customer: any;



displayedColumns1 = ['id', 'product_list', 'count'];
dataSource1 = new MatTableDataSource;

displayedColumns2 = ['id', 'name'];
dataSource2 = new MatTableDataSource;

values: any = ['7 Days','15 Days','30 Days','45 Days']

  constructor(private DashboardService:DashboardService, public nav: AppService) { }

  ngOnInit() {
  this.nav.show();
  this.DashboardService.count().subscribe( res => {
   this.counts = res;
   });

 this.DashboardService.top_products().subscribe( res => {
   this.top_products = res;
   this.dataSource1 = new MatTableDataSource(this.top_products);
   });

  this.DashboardService.lastest_order().subscribe( res => {
   this.latest_orders = res;
   this.dataSource2 = new MatTableDataSource(this.latest_orders);
   });

   this.DashboardService.order_stat("30 days").subscribe( res => {
   this.order_statistics = res;
   for (let data of this.order_statistics.date) {
    this.chartLabels.push(data);    
    }
   this.chartData = [ { data: this.order_statistics.count, label: 'Orders' } ];
   });

   this.DashboardService.doughnut().subscribe( res => {
   this.review = res;
   this.happy_customer = res[0];
   this.unhappy_customer = res[1];
   this.chartData1 = [{ data: this.review }];
   })  

  }

  order_stat_filter(event){
  this.chartLabels = [];
     console.log(event.value);
    this.DashboardService.order_stat(event.value).subscribe( res => {
   this.order_statistics = res;
   for (let data of this.order_statistics.date) {
    this.chartLabels.push(data);    
    }
   this.chartData = [ { data: this.order_statistics.count, label: 'Orders' } ];
   });

  }

  chartOptions = {
    responsive: true,
    fill: 'start',
    showLine: false,
    scales: {
        xAxes: [{
             gridLines: { drawBorder: true, display: true }
        }],
        yAxes: [{
             gridLines: { drawBorder: true, display: true },
             ticks: { beginAtZero: true }
        }]
    }    
  };

   public chartData = [
    { data: [], label: '' }
  ];

 public chartLabels = [];

  ChartColors = [
    { 
      backgroundColor: 'rgba(11, 193, 170, 0.2)',
      borderColor: 'rgb(11, 193, 170)',
      pointBackgroundColor: 'rgb(11, 193, 170)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(11, 193, 170)'
    }
  ];

  Doughnutcolors = [
    { 
      backgroundColor: 'rgb(200, 230, 206)'
    },

    { 
      backgroundColor: 'rgb(227, 72, 102)'
    }

  ];  

  public doughnutChartColors: any[] = [{ backgroundColor: ["#7cc387","#c8e6ce"] }];

  onChartClick(event) {
    console.log(event);
  }

  public chartLabel1 = ['happy customers','unhappy customers'];

  chartOptions1 = {
    responsive: true,
    animation: {
    animateRotate: true,
    animateScale: true,
    easing: 'easeOutBack'
  }
  };

  public chartData1 = [
    { data: [] }
  ];

  onChart1Click(event) {
    console.log(event);
  }

   chartOptions2 = {
    responsive: true,
    fill: 'start',
    showLine: false
  };

public  chartData2 = [
    { data: [330, 600, 260, 700, 320, 530], label: 'Account A' }
  ];

 public chartLabels2 = ['January', 'February', 'March', 'April', 'May', 'June'];

  onChart2Click(event) {
    console.log(event);
  }
}