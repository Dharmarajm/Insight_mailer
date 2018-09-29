import { Component, OnInit, Inject } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AppService } from './../app.service';
import {  MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Routes } from '@angular/router';


declare var google:any;
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
all_top_products: any;
sync: any;
canceled: any;
unshipped: any;
pickup: any;
return: any;
reject: any;
delivered: any;
pending: any;
top_customers: any;
order: any;
graphres:any;
state_count: any;
feedState_count:any;

displayedColumns1 = ['id', 'product_list', 'count'];
dataSource1 = new MatTableDataSource;

displayedColumns2 = ['id', 'name'];
dataSource2 = new MatTableDataSource;

displayedColumns3 = ['id', 'customer_name', 'count'];
dataSource3 = new MatTableDataSource;

values: any = ['7 Days','15 Days','30 Days','45 Days','90 Days']


  constructor(private DashboardService:DashboardService, public nav: AppService,public dialog: MatDialog,private spinner: NgxSpinnerService) { }

  ngOnInit() {

  

  
  this.nav.show();
  this.spinner.show();
  this.DashboardService.count().subscribe( res => {
   this.counts = res;
   });

 this.DashboardService.top_products().subscribe( res => {
   this.top_products = res;
   this.dataSource1 = new MatTableDataSource(this.top_products);
   console.log(this.dataSource1);
   });

  this.DashboardService.lastest_order().subscribe( res => {
   this.latest_orders = res;
   this.dataSource2 = new MatTableDataSource(this.latest_orders);
   });

   this.DashboardService.top_customer().subscribe( res => {
   this.top_customers = res;
   this.dataSource3 = new MatTableDataSource(this.top_customers);
   console.log(this.dataSource3);
   });

   this.DashboardService.order_stat("30 days").subscribe( res => {
   this.order_statistics = res;
   this.state_count =this.order_statistics.state_count;
   for (let data of this.order_statistics.date) {
    this.chartLabels.push(data);    
    }
   this.chartData = [ { data: this.order_statistics.count, label: 'Orders' } ];
   });

   this.DashboardService.feedback_stat("30 days").subscribe( res => {
   this.feedback_statistics = res;
   this.feedState_count=this.feedback_statistics.state_count;
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
   console.log(this.chartData1);
   this.spinner.show();
   })


   this.DashboardService.order().subscribe( res => {
   this.order = res;
   this.canceled = res[0];
   this.unshipped = res[1];
   this.pickup = res[2];
   this.return = res[3];
   this.reject = res[4];
   this.delivered = res[5];
   this.pending = res[6];
   this.chartData3 = [{ data: this.order }];
   console.log(this.chartData3);
   // this.spinner.show();
   })

   this.DashboardService.last_sync().subscribe( res => {
   this.sync = res;
   console.log(this.sync);
   });  

    this.DashboardService.geo_graph().subscribe( res => {
  this.graphres = res;

 google.charts.load('visualization', '1', {'packages': ['geochart']});
 google.charts.setOnLoadCallback(drawVisualization);
 
 var graph=this.graphres.graph_data;
function drawVisualization() {
 
  var data = google.visualization.arrayToDataTable(graph);

  
      var opts = {
        region: 'IN',
        domain:'IN',
        displayMode: 'regions',
        colorAxis: {colors: ['#d4b114', '#8dc63f', '#156006']},
        resolution: 'provinces',
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#c8c8c8',
        defaultColor: '#f5f5f5'
       
      };
      var geochart = new google.visualization.GeoChart(
          document.getElementById('visualization'));
      geochart.draw(data, opts);
    };
    
  });
   
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

  latest_order_full(){
            let dialogRef_all_products = this.dialog.open(AllTopProducts, {
                    width: '1500px',
                    //disableClose: true
                  });

                  dialogRef_all_products.afterClosed().subscribe(result => {
                    
                  });

  }



   All_customer_detail(){
            let dialogRef_all_products = this.dialog.open(AllTopProducts, {
                    width: '1500px',
                    //disableClose: true
                  });

                  dialogRef_all_products.afterClosed().subscribe(result => {
                    
                  });

  }
  


  


  all_repeat_customer(){
            let dialogRef_all_products = this.dialog.open(AllRepeatCustomers, {
                    width: '1500px',
                    //disableClose: true
                  });

                  dialogRef_all_products.afterClosed().subscribe(result => {
                    
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
      backgroundColor: 'rgbA(213, 240, 234, .8)',
      borderColor:'rgbA(12, 194, 170,.5)',
      borderWidth:2,
      animation: {
    easing: 'linear'
  }
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

  public doughnutChartColors: any[] = [{ backgroundColor: ["#c8e6ce","#7cc387"] }];
  public doughnutChartColors1: any[] = [{ backgroundColor: ["#ff2e2e","#3f82f8","#12edd0","#3366cc","#f98230","#54cf64","#fff033"] }];

  onChartClick(event) {
    if(event.active[0]){
        let dialogRef_all_products = this.dialog.open(DailyOrders, {
                    width: '1500px',
                    //disableClose: true
                    data: {date: event.active[0]._model.label}
                  });

                  dialogRef_all_products.afterClosed().subscribe(result => {
                    
                  });
    }
  }

  public chartLabel1 = ['happy customers','unhappy customers'];
  public chartLabel3 = ['canceled','unshipped','pickup','return','reject','delivered','pending'];

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

   chartOptions3 = {
    responsive: true,
    animation: {
    animateRotate: true,
    animateScale: true,
    easing: 'easeOutBack'
  },
   legend: {
            display: true
         }
  };

  public chartData1 = [
    { data: [] }
  ];

  public chartData3 = [
    { data: [] }
  ];

  onChart1Click(event) {
    //if(event.active[0]._index == 1){
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
    //}

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
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService,public dialog: MatDialog) { }

    ngOnInit() {
     this.DashboardService.review().subscribe( res => {
       this.feedbacks = res;
      });
    }

    replay(feedback){
      console.log(feedback);
      localStorage.setItem("comment",feedback.comments)
      this.dialogRef.close(feedback);
      
    }

    openpopup(value) {
      this.dialogRef.close(value);
      console.log(value);
      let dialogRef = this.dialog.open(SentimentAnalysis, {
              width: '1000px'
            });

          
}

    close(){
     this.dialogRef.close();
    }

    

}


@Component({
  selector: 'sentiment',
  templateUrl: 'sentiment.html',
})
export class SentimentAnalysis implements OnInit {

  //sentiment: any;
 

  constructor(
    public dialogRef: MatDialogRef<SentimentAnalysis>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService) { }

    ngOnInit() {
    //  this.DashboardService.review().subscribe( res => {
    //    this.sentiment = res;
    //   });

    

   
   
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
ckeditorContent: any;
subject: any;
selectedValue:any;
suggestion:any;

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
        this.ckeditorContent='';
        let command=localStorage.getItem('comment')
           // alert(command);
        this.DashboardService.sentimentdata(command).subscribe( res => {
         console.log(res);
        // let sec=res;
         this.suggestion=res;

        console.log(this.suggestion)
          });
    }

    commentChange(Value){
      
      this.ckeditorContent=this.selectedValue;
     
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






@Component({
  selector: 'review1',
  templateUrl: 'repeat_customer_mail.html',
})
export class RepeatCustomerMail implements OnInit {

ckeConfig: any;
ckeditorContent: any;
subject: any;
selectedValue:any;
cusMail:any;

  constructor(
    public dialogRef: MatDialogRef<RepeatCustomerMail>,
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

        localStorage.getItem("repeatCusMail");
        this.cusMail=localStorage.getItem("repeatCusMail");
        //alert(this.cusMail);
        
    }

    insert(event){
     }

    commentChange(Value){
      
      this.ckeditorContent=this.selectedValue;
     
    }


    close(){
     //this.dialogRef.close();
    }
 


 onNoClick(): void {
    this.dialogRef.close();
  }

  send(ckeditorContent,subject): void {
  this.DashboardService.repeat_customer_mail(ckeditorContent,subject,this.cusMail).subscribe( res => {
    });
     this.dialogRef.close(ckeditorContent);
  }

  onChange($event) {}
  onFocus($event) {}
  onBlur($event) {}

}


@Component({
  selector: 'all_top_products',
  templateUrl: 'all_top_products.html',
})
export class AllTopProducts implements OnInit {

top_products: any;
values: any = ['7 Days','15 Days','30 Days','45 Days','365 Days'];
interval: any ='45 Days';

  constructor(
    public dialogRef: MatDialogRef<AllTopProducts>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService) { }

    ngOnInit() {
    this.DashboardService.all_top_products(this.interval).subscribe( res => {
     this.top_products = res;
    });
    }
 
    top_order_filter(event){
    this.DashboardService.all_top_products(event.value).subscribe( res => {
     this.top_products = res;
    });
    }
    productClick(pdata){
    console.log(pdata);
    this.dialogRef.close();
    sessionStorage.setItem("Proasin", pdata.title[1]);

    //this.router.navigate(['/promotion']);
    }
    datareverse(){
      this.top_products.reverse(); 
    }

     

    close(){
     this.dialogRef.close();
    }

}



@Component({
  selector: 'all_repeat_customers',
  templateUrl: 'all_repeat_customers.html',
})
export class AllRepeatCustomers implements OnInit {

top_customers: any;
values: any = ['7 Days','15 Days','30 Days','45 Days'];
interval: any ='45 Days';

  constructor(
    public dialogRef: MatDialogRef<AllRepeatCustomers>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService,public dialog: MatDialog) { }

    ngOnInit() {
    this.DashboardService.all_repeat_customers(this.interval).subscribe( res => {
     this.top_customers = res;
    });
    }
 
    
          replay(data){
      console.log(data);
      localStorage.setItem("repeatCusMail",data[0][0]);
      this.dialogRef.close();
       let dialogRef1 = this.dialog.open(RepeatCustomerMail, {
                             width: '1000px',
                             disableClose: true,
                             //data: {feedback: result}
                          });

                          dialogRef1.afterClosed().subscribe(result => {
                    
                          });
      
    }

    top_order_filter(event){
    this.DashboardService.all_repeat_customers(event.value).subscribe( res => {
     this.top_customers = res;
    });
    }

    close(){
     this.dialogRef.close();
    }

}



@Component({
  selector: 'daily_orders',
  templateUrl: 'daily_orders.html',
})
export class DailyOrders implements OnInit {

daily_orders: any;
date: any;

  constructor(
    public dialogRef: MatDialogRef<DailyOrders>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DashboardService:DashboardService) { }

    ngOnInit() {
    this.date = this.data.date;
    this.DashboardService.daily_order(this.data.date).subscribe( res => {
     this.daily_orders = res;
    });
    }


    close(){
     this.dialogRef.close();
    }

}

