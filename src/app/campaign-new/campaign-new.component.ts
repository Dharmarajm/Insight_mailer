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
isLinear = true;

public firstFormGroup: FormGroup;
public secondFormGroup: FormGroup;
public thirdFormGroup: FormGroup;
templates:any;
inventories:any;
edit_id: any;
edit_data: any;
id: number = 0;
name: any;

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

  campaign_name_uniq(name){
      this.CampaignService.name_uniq(name).subscribe( res => {
      if(res){
        alert("Campaign name aleredy in use");
        this.name = '';
        }
     });
    }


  name_ok(name): void {
localStorage.setItem("campaign",name);
    // this.dialogRef1.close(name);
  }

  close(){
   this.router.navigate(['campaign']);  
  }


  template_data(template,event): void {
  if (event.checked){
  this.id = template.id;
  this.CampaignService.campaign_create(template.id).subscribe( res => {
    console.log(res);
    let camp_id:any = res;
    localStorage.setItem("campaign_id",camp_id);
    });
    }else{
     this.id = 0;
    }
  }

  asin(event,asin_data){
    if (event.checked){
     console.log("asin added" + asin_data );
     this.CampaignService.asin_push(asin_data).subscribe( res => {
      console.log(res);
    });
     }else{
      console.log("asin removed" + asin_data );
      this.CampaignService.asin_remove(asin_data).subscribe( res => {
       console.log(res);
    });
     }
    }

   addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        if(control.controls.length <= 4){
        const addrCtrl = this.initAddress();
        control.push(addrCtrl);
        }else{
                alert("hi");
        }
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

promotion_template(){
  let dialogRef = this.dialog.open(EditTemplate, {
                    width: '1000px',
                    disableClose: true
                  });

                  dialogRef.afterClosed().subscribe(result => {
                  
                  });
}

}



@Component({
  selector: 'edit_template',
  templateUrl: 'edit_template.html',
  styleUrls: ['./campaign-new.component.css']
})
export class EditTemplate {

name: string;

//editor
ckeConfig: any;
ckeditorContent: any;

  constructor(
    public dialogRef: MatDialogRef<EditTemplate>) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    this.dialogRef.close();
    //alert("are you sure?");
  }

ok(ckeditorContent): void {
  console.log(ckeditorContent);
     this.dialogRef.close();
  }

  insert(event){
    event.insertText("{{Buyer_Name}}");
  }

  onChange($event) {}
  onFocus($event) {}
  onBlur($event) {}


}