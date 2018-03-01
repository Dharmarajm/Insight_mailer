import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Customer, Address } from './../campaign/trigger.interface';


@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.css']
})
export class CampaignNewComponent implements OnInit {

campaings: any;

public firstFormGroup: FormGroup;
public secondFormGroup: FormGroup;
public thirdFormGroup: FormGroup;
templates:any;
inventories:any;
edit_id: any;
edit_data: any;

public myForm: FormGroup;
public formArray: any;

values: string[] = ["ordered","shipped","delevered","returned"];

  constructor(public dialog: MatDialog,private CampaignService:CampaignService, private _formBuilder: FormBuilder, private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.params.subscribe( params => this.edit_id = params);
  console.log(this.edit_id);
  if(this.edit_id.id){
   this.CampaignService.edit_campaign(this.edit_id.id).subscribe( res => {
   this.edit_data = res;
    });
    }
  this.CampaignService.getcampaigns().subscribe( res => {
    this.campaings = res;
    });

    this.CampaignService.gettemplates().subscribe( res => {
    this.templates = res;
    });

    this.CampaignService.getinventories().subscribe( res => {
    this.inventories = res;
    });

    
 this.myForm = this._formBuilder.group({
            name: [''],
            addresses: this._formBuilder.array([])
        });

         this.addAddress();

          this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }


  name_ok(name): void {
localStorage.setItem("campaign",name);
    // this.dialogRef1.close(name);
  }

  close(){
   this.router.navigate(['campaign']);  
  }


  templatedata(template): void {
  this.CampaignService.campaign_create(template.id).subscribe( res => {
    console.log(res);
    let camp_id:any = res;
    localStorage.setItem("campaign_id",camp_id);
    });
   // this.dialogRef2.close();
  }

   addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        const addrCtrl = this.initAddress();
        
        control.push(addrCtrl);
    }

    initAddress() {
        return this._formBuilder.group({
            trigger: ['', Validators.required],
            days: ['', Validators.required]
        });
    }

    getTasks(myForm){
    return myForm.get('addresses').controls
  }

  removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

save(myForm) {
      console.log(myForm.value.addresses[0]);
     this.CampaignService.campaign_update(myForm.value.addresses).subscribe( res => {
      console.log(res);
      //this.campaings.push(res);
      this.router.navigate(['campaign']);
    });
}

}