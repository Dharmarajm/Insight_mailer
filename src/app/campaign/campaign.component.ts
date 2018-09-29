import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './campaign.service';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Customer, Address } from './trigger.interface';
import { AppService } from './../app.service';

import { map } from 'rxjs/operators';
import swal from 'sweetalert2'

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  animal: string = "test";
  name: string = "test1";
  ckeditorContent:any;
  //public ckeConfig: any;
  public  campaings: any;
  page1: any;

  del_id: any;

  constructor(public dialog: MatDialog,private CampaignService:CampaignService,private router:Router,public nav: AppService) { }

  ngOnInit() {
  this.nav.show();
  this.CampaignService.getcampaigns().subscribe( res => {
    this.campaings = res;
    });

    // extraPlugins: 'strinsert',
  }

  block(id,status){
     this.campaings.filter((person) => person.id == id).map((data) => data.send_when_negative_feedback = status );
     this.CampaignService.block_campaign(id,status).subscribe( res => {
     })
  }


campaign_edit(id){
    this.router.navigate(['edit_campaign', id]);
}


new_campaign(){
     this.router.navigate(['new_campaign']);
  }

campaign_email_stat(id){
  this.router.navigate(['email_status',id]);
}


campaign_delete(campaign,index){
this.del_id = campaign.id;
swal({
  title: 'Are you sure?',
  text: 'All Scheduled Mails and Campaign will be deleted!',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
  this.CampaignService.delete_campaign(this.del_id).subscribe( res => {
    this.campaings.splice(this.campaings.indexOf(campaign), 1);
    });
    swal(
      'Deleted!',
      'Your Campaign is deleted.',
      'success'
    )
  } else if (result.dismiss === swal.DismissReason.cancel) {
    swal(
      'Cancelled',
      'Your Campaign is safe :)',
      'error'
    )
  }
})






}

insert(event){
	event.insertText("{{Buyer_Name}}");
}

  onChange($event){}
  onFocus($event){}
  onBlur($event){}


enable(_id,event){
  this.CampaignService.enable_campaign(_id,event.checked).subscribe( res => {
    });
}





}




@Component({
  selector: 'campaign_trigger',
  templateUrl: 'campaign_trigger.html',
})
export class CampaignTrigger {

public myForm: FormGroup;
public formArray: any;

values: string[] = ["ordered","shipped","delevered","returned"];

  constructor(
    public dialogRef4: MatDialogRef<CampaignTrigger>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder, private CampaignService:CampaignService) { }

  onNoClick(): void {
   // this.dialogRef4.close();
  }


    ngOnInit() {
        this.myForm = this._fb.group({
            name: [''],
            addresses: this._fb.array([])
        });
        
        // add address
        this.addAddress();
    }

    initAddress() {
        return this._fb.group({
            trigger: ['', Validators.required],
            days: ['', Validators.required]
        });
    }

    getTasks(myForm){
    return myForm.get('addresses').controls
  }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        const addrCtrl = this.initAddress();
        
        control.push(addrCtrl);
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(myForm) {
     this.CampaignService.campaign_update(myForm.value.addresses).subscribe( res => {
      //this.campaings.push(res);
      this.dialogRef4.close(res);
    });
        // call API to save
    }


}