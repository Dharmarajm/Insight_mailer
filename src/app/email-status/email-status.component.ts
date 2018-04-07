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

displayedColumns = ['id', 'buyer_name','sent_date', 'amazon_order_id','template_data' ];
dataSource1 = new MatTableDataSource();
dataSource2 = new MatTableDataSource();

emails: any;
camp_id: any;
sent_emails: any;
pending_emails: any;

  constructor(public CampaignService:CampaignService, public nav: AppService, private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

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

   this.CampaignService.getemails(this.camp_id).subscribe( res => { 
   this.emails = res;
   this.sent_emails = this.emails.sent.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_date: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   template_data: item.template_data
}));
   this.pending_emails = this.emails.pending.map(item => ({
   buyer_name: item.template_data.buyer_name,
   sent_date: item.trigger_date,
   amazon_order_id: item.template_data.amazon_order_id,
   template_data: item.template_data
}));
   this.dataSource1 = new MatTableDataSource(this.sent_emails);
   this.dataSource2 = new MatTableDataSource(this.pending_emails);
   });
  
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