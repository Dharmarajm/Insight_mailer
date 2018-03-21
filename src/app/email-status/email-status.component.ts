import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
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

displayedColumns = ['id','buyer_name', 'sent_date', 'amazon_order_id','template_data' ];
dataSource1 = new MatTableDataSource();
dataSource2 = new MatTableDataSource();

emails: any;
camp_id: any;
sent_emails: any;
pending_emails: any;

  constructor(public CampaignService:CampaignService, public nav: AppService, private router:Router,private route: ActivatedRoute) { }

  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  ngOnInit() {
  this.nav.show();

  this.route.params.subscribe( params => this.camp_id = params.id);
  console.log(this.camp_id);

   this.CampaignService.getemails(this.camp_id).subscribe( res => { 
   this.emails = res;
   console.log(res);
   this.sent_emails = this.emails.sent.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_data: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   template_data: item.template_data
}));
   this.pending_emails = this.emails.pending.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_data: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   template_data: item.template_data
}));
   console.log(this.pending_emails);
   this.dataSource1 = new MatTableDataSource(this.sent_emails);
   this.dataSource2 = new MatTableDataSource(this.pending_emails);
   });
  
  }

}