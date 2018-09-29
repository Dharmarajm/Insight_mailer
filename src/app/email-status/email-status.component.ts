import { Component, OnInit, ViewChild, Inject, Pipe, PipeTransform } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'email-status',
  templateUrl: './email-status.component.html',
  styleUrls: ['./email-status.component.css']
})
export class EmailStatusComponent implements OnInit {

displayedColumns = ['id', 'buyer_name','sent_date', 'amazon_order_id','subject' ];
dataSource1 = new MatTableDataSource();
dataSource2 = new MatTableDataSource();


emails: any=[];
camp_id: any;
sent_emails: any=[];
pending_emails: any=[];
status: any;

send_scroll:any=[];
sendpage: any = 1;
sendsearch_page: number = 1;
sendmail_scroll: boolean = true;
senddateShow:boolean;

pending_scroll:any=[];
pendingpage: any = 1;
pendingsearch_page: number = 1;
pendingmail_scroll: boolean = true;
pendingdateShow:boolean;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(public CampaignService:CampaignService, public nav: AppService, private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }

  ngOnInit() {
  this.nav.show();


  this.route.params.subscribe( params => this.camp_id = params.id);

  this.sendpage = 1;
  this.sendsearch_page = 1;
  this.sendmail_scroll = true;

  this.pendingpage = 1;
  this.pendingsearch_page = 1;
  this.pendingmail_scroll = true;

   this.CampaignService.campaign_stat(this.camp_id).subscribe( res => {
         this.status = res[0];
   })

   this.CampaignService.getemails(this.camp_id,this.sendpage).subscribe( res => { 
     
   this.emails = res;
  
   this.sent_emails = this.emails.sent.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_date: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   subject: item.subject
}));
   this.pending_emails = this.emails.pending.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_date: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   subject: item.subject
}));
   this.dataSource1 = new MatTableDataSource(this.sent_emails);
   this.dataSource2 = new MatTableDataSource(this.pending_emails);
   });

   this.senddateShow=true;
   this.pendingdateShow=true;
  
  }


  preview_template(data){
    let dialogRef = this.dialog.open(Preview, {
                    height: '800px',
                    width: '800px',
                    data: {data: data}
                  });

                  dialogRef.afterClosed().subscribe(result1 => {

                  })
  }

  onScroll(e) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      const buffer = 400;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      //alert(this.sent_emails.length);
  
     if (scrollLocation > limit && this.senddateShow==true) {
     
     if(this.sendmail_scroll && this.sent_emails.length == (20*this.sendpage)){
      this.sendpage = this.sendpage + 1;
     console.log(this.sendpage);
      this.CampaignService.getemails(this.camp_id,this.sendpage).debounceTime(200).throttleTime(50).subscribe( res => { 
        this.emails = res;
        this.send_scroll = this.emails.sent.map(item => ({
        buyer_name: item.template_data.buyer_name,
        sent_date: item.trigger_date,
        amazon_order_id: item.template_data.amazon_order_id,
        subject: item.subject
     }));
    
     this.send_scroll.map(item => this.sent_emails.push(item));
        this.dataSource1 = new MatTableDataSource(this.sent_emails);
        console.log(this.sent_emails);
       
        });
      }
    //   }else if(!this.sendmail_scroll && this.orders.length == (20*this.search_page)){
    //    this.search_page = this.search_page + 1;
    //    this.OrderService.order_search(this.filter_search,this.search_page).debounceTime(400).throttleTime(400).subscribe( res => {
    //     this.orders_scroll = res;
    //     this.orders_scroll = this.orders_scroll.map(item => ({
    //     amazon_order_id: item.amazon_order_id,
    //     asin: item.find_order[0].asin,
    //     title: item.find_order[0].title,
    //     buyer_name: item.buyer_name,
    //     purchased_at: item.purchased_at,
    //     tfm_shipment_status: item.tfm_shipment_status,
    //     status: item.status
    // }));
    // this.orders_scroll.map(item => this.orders.push(item));
    //  this.dataSource = new MatTableDataSource(this.orders);
    //  });
    //   }
  
    }
  
  }

  onScrollPending(e) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      const buffer = 400;
      const limit = tableScrollHeight - tableViewHeight - buffer;
  
     if (scrollLocation > limit && this.pendingdateShow==true) {
     
     if(this.pendingmail_scroll && this.pending_emails.length == (20*this.pendingpage)){
      this.pendingpage = this.pendingpage + 1;
     console.log(this.sendpage);
      this.CampaignService.getemails(this.camp_id,this.pendingpage).debounceTime(200).throttleTime(50).subscribe( res => { 
        this.emails = res;
        this.pending_scroll = this.emails.pending.map(item => ({
          buyer_name: item.template_data.buyer_name,
          sent_date: item.trigger_date,
          amazon_order_id: item.template_data.amazon_order_id,
          subject: item.subject
     }));
    
     this.pending_scroll.map(item => this.pending_emails.push(item));
        this.dataSource2 = new MatTableDataSource(this.pending_emails);
        console.log(this.pending_emails);
       
        });
      }
    //   }else if(!this.sendmail_scroll && this.orders.length == (20*this.search_page)){
    //    this.search_page = this.search_page + 1;
    //    this.OrderService.order_search(this.filter_search,this.search_page).debounceTime(400).throttleTime(400).subscribe( res => {
    //     this.orders_scroll = res;
    //     this.orders_scroll = this.orders_scroll.map(item => ({
    //     amazon_order_id: item.amazon_order_id,
    //     asin: item.find_order[0].asin,
    //     title: item.find_order[0].title,
    //     buyer_name: item.buyer_name,
    //     purchased_at: item.purchased_at,
    //     tfm_shipment_status: item.tfm_shipment_status,
    //     status: item.status
    // }));
    // this.orders_scroll.map(item => this.orders.push(item));
    //  this.dataSource = new MatTableDataSource(this.orders);
    //  });
    //   }
  
    }
  
  }

}

@Component({
  selector: 'preview_data',
  templateUrl: 'preview.html',
  styleUrls: ['./email-status.component.css']
})
export class Preview {

email: any;

  constructor(
    public dialogRef: MatDialogRef<Preview>,@Inject(MAT_DIALOG_DATA) public data: any) { 
   this.email = this.data.data;
    }


ok(): void {
     this.dialogRef.close();
  }


}