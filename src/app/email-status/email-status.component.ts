import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'email-status',
  templateUrl: './email-status.component.html',
  styleUrls: ['./email-status.component.css']
})
export class EmailStatusComponent implements OnInit {

displayedColumns = ['id','buyer_name', 'sent_date', 'amazon_order_id','template_data' ];
dataSource = new MatTableDataSource();

emails: any;
camp_id: any;

  constructor(public CampaignService:CampaignService, public nav: AppService, private router:Router,private route: ActivatedRoute) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   

  ngOnInit() {
  this.nav.show();

  this.route.params.subscribe( params => this.camp_id = params.id);
  console.log(this.camp_id);

   this.CampaignService.getemails(this.camp_id).subscribe( res => { 
   this.emails = res;
   console.log(res);
   this.emails = this.emails.map(item => ({
  buyer_name: item.order.shipping_address["name"],
  sent_data: item.trigger_date,
  amazon_order_id: item.template_data,
  template_data: item.template_data
}));
   //console.log(this.orders);
   this.dataSource = new MatTableDataSource(this.emails);
   });
  
  }

}


