import { Component, OnInit, Inject } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AppService } from './../app.service';
import {  MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2'

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
feedback_statistics: any;


displayedColumns1 = ['id', 'product_list', 'count'];
dataSource1 = new MatTableDataSource;

displayedColumns2 = ['id', 'name'];
dataSource2 = new MatTableDataSource;

values: any = ['7 Days','15 Days','30 Days','45 Days']

  constructor(private DashboardService:DashboardService, public nav: AppService,public dialog: MatDialog) { }

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

   this.DashboardService.feedback_stat("30 days").subscribe( res => {
   this.feedback_statistics = res;
   for (let data of this.feedback_statistics.date) {
    this.chartLabels2.push(data);    
    }

   this.chartData2 = [ { data: this.feedback_statistics.count, label: 'Emails' } ];
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
    this.DashboardService.order_stat(event.value).subscribe( res => {
   this.order_statistics = res;
   for (let data of this.order_statistics.date) {
    this.chartLabels.push(data);    
    }
   this.chartData = [ { data: this.order_statistics.count, label: 'Orders' } ];
   });

  }

  feedback_stat_filter(event){
  this.chartLabels2 = [];
    this.DashboardService.feedback_stat(event.value).subscribe( res => {
   this.feedback_statistics = res;
   for (let data of this.feedback_statistics.date) {
    this.chartLabels2.push(data);    
    }
   this.chartData2 = [ { data: this.feedback_statistics.count, label: 'Emails' } ];
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

  ChartColors1 = [
    { 
      backgroundColor: 'rgbA(124, 195, 134, 1)',
    }
  ];

  ChartColors2 = [
    { 
      backgroundColor: 'rgbA(124, 195, 134, 1)',
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
  }

  public chartLabel1 = ['happy customers','unhappy customers'];

  chartOptions1 = {
    responsive: true,
    animation: {
    animateRotate: true,
    animateScale: true,
    easing: 'easeOutBack'
  },
   legend: {
            display: false
         }
  };

  public chartData1 = [
    { data: [] }
  ];

  onChart1Click(event) {
    if(event.active[0]._index == 1){
            let dialogRef = this.dialog.open(Feedback, {
                    width: '1000px'
                  });

                  dialogRef.afterClosed().subscribe(result => {
                     if(result){
                         let dialogRef1 = this.dialog.open(NegativeReviewMail, {
                             width: '1000px',
                             disableClose: true,
                             data: {feedback: result}
                          });

                          dialogRef1.afterClosed().subscribe(result => {
                    
                          });
                      }
                    
                  });
    }

  }

   chartOptions2 = {
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

public  chartData2 = [
    { data: [], label: 'Emails' }
  ];

 public chartLabels2 = [];

  onChart2Click(event) {
    console.log(event);
  }
}

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html',
})
export class Feedback implements OnInit {

feedbacks: any;

  constructor(
    public dialogRef: MatDialogRef<Feedback>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService) { }

    ngOnInit() {
     this.DashboardService.review().subscribe( res => {
       this.feedbacks = res;
      });
    }

    replay(feedback){
      this.dialogRef.close(feedback);
    }

    close(){
     this.dialogRef.close();
    }

}

@Component({
  selector: 'review',
  templateUrl: 'negative_review_mail.html',
})
export class NegativeReviewMail implements OnInit {

ckeConfig: any;

  constructor(
    public dialogRef: MatDialogRef<NegativeReviewMail>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService) { }

    ngOnInit() {
      this.ckeConfig = {
            height: 400,
            uiColor: "#ebebeb",
            language: "en",
            allowedContent: true,
            toolbar: [
            { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
                { name: "clipboard", items: ["Undo", "Redo"] },
                { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                { name: "styles", items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] }
            ]
        };
    }

    close(){
     //this.dialogRef.close();
    }
 
 insert(event){
swal({
  title: 'Select Outage Tier',
  input: 'select',
  inputOptions: {
    '{{Buyer Name}}': '{{Buyer Name}}',
    '{{Order Id}}': '{{Order Id}}',
    '{{Merchant_id}}': '{{Merchant_id}}',
    '{{Product Title}}': '{{Product Title}}',
    '{{ASIN}}': '{{ASIN}}',
    
  },
  inputPlaceholder: 'required',
  showCancelButton: true,
   inputValidator: function (value) {
    return new Promise(function (resolve, reject) {
      if (value !== '') {
        resolve();
      } else {
        reject('You need to select a Tier');
      }
    });
  }
}).then(function (result) {
    let data = JSON.stringify(result.value);
    event.insertText(data);
});

  }

 onNoClick(): void {
    this.dialogRef.close();
  }

  ok(ckeditorContent,subject): void {
  this.DashboardService.negative_feedback_mail(ckeditorContent,this.data.feedback,subject).subscribe( res => {
    });
     this.dialogRef.close(ckeditorContent);
  }

  onChange($event) {}
  onFocus($event) {}
  onBlur($event) {}

}