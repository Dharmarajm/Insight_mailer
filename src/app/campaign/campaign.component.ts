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

  /*this.ckeConfig = {
            height: 50,
            uiColor: "#ebebeb",
            language: "en",
            allowedContent: true,
            toolbar: [
            { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
                { name: "editing", items: ["Find", "Replace", "SelectAll"] },
                { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
                { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                { name: "styles", items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] }
            ]
        };*/

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
  text: 'You will not be able to recover this file!',
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
      'Your Campaing has been deleted.',
      'success'
    )
  } else if (result.dismiss === swal.DismissReason.cancel) {
    swal(
      'Cancelled',
      'Your Campaing is safe :)',
      'error'
    )
  }
})






}

insert(event){
	//event.insertText("#{user_name}");
	event.insertText("{{Buyer_Name}}");
}

  onChange($event){}
  onFocus($event){}
  onBlur($event){}


enable(_id,event){
  this.CampaignService.enable_campaign(_id,event.checked).subscribe( res => {
    });
}


openDialog(): void {
    let dialogRef1 = this.dialog.open(CampaignName, {
      width: '500px',
      disableClose: true
    });

    dialogRef1.afterClosed().subscribe(result => {
      this.animal = result;
      let dialogRef2;
      if(this.animal){
          let dialogRef2 = this.dialog.open(CampaignTemplate, {
            width: '1000px',
            disableClose: true
          });
         
          dialogRef2.afterClosed().subscribe(result => {
           this.animal = result;

              let dialogRef3 = this.dialog.open(CampaignAsin, {
                width: '1000px'
               });

              dialogRef3.afterClosed().subscribe(result => {
               this.animal = result;

                  let dialogRef4 = this.dialog.open(CampaignTrigger, {
                    width: '1000px',
                    disableClose: true
                  });

                  dialogRef4.afterClosed().subscribe(result => {
                    this.campaings.unshift(result);
                  });


                  
                  

                });

           });

        } // this is for dialog1 cancel button

     });


  }


}


@Component({
  selector: 'campaign_name',
  templateUrl: 'campaign_name.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignName {

name: string;

  constructor(
    public dialogRef1: MatDialogRef<CampaignName>) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    this.dialogRef1.close();
  }

ok(name): void {
this.name = name;
localStorage.setItem("campaign",this.name);
     this.dialogRef1.close(this.name);
  }


}

@Component({
  selector: 'CampaignTemplate',
  templateUrl: 'campaign_template.html',
})
export class CampaignTemplate {

templates:any;

  constructor(
    public dialogRef2: MatDialogRef<CampaignTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any,private CampaignService:CampaignService) {
   this.CampaignService.gettemplates().subscribe( res => {
    this.templates = res;
    });

   }

  templatedata(template): void {
  this.CampaignService.campaign_create(template.id).subscribe( res => {
    let camp_id:any = res;
    localStorage.setItem("campaign_id",camp_id);
    });
    this.dialogRef2.close();
  }


}

@Component({
  selector: 'campaign_asin',
  templateUrl: 'campaign_asin.html',
})
export class CampaignAsin {

inventories:any;
name: any;

  constructor(
    public dialogRef3: MatDialogRef<CampaignAsin>,
    @Inject(MAT_DIALOG_DATA) public data: any,private CampaignService:CampaignService) { 

 this.CampaignService.getinventories().subscribe( res => {
    this.inventories = res;
    });

    }

    asin(event,asin_data){
    if (event.checked){
     console.log("asin added" + asin_data );
     this.CampaignService.asin_push(asin_data).subscribe( res => {
    });
     }else{
      console.log("asin removed" + asin_data );
      this.CampaignService.asin_remove(asin_data).subscribe( res => {
    });
     }
    }

  

  onNoClick(): void {
    this.dialogRef3.close();

  }

ok(name): void {
localStorage.setItem("campaign",name);
     this.dialogRef3.close(name);
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