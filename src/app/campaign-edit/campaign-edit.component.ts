import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Customer, Address } from './../campaign/trigger.interface';
import swal from 'sweetalert2'


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./../campaign-new/campaign-new.component.css']
})
export class CampaignEditComponent implements OnInit {

campaings: any;
isLinear = false;

public firstFormGroup: FormGroup;
public secondFormGroup: FormGroup;
public thirdFormGroup: FormGroup;
templates:any;
inventories:any;
edit_id: any;
edit_data: any;
id: number = 0;
name: any;

triggerdata: any;
pass: boolean = true;
addrCtrl: any;

public myForm: FormGroup;
public formArray: any;


values: string[] = ["ordered","shipped","delevered","returned"];

  constructor(public dialog: MatDialog,private CampaignService:CampaignService, private _formBuilder: FormBuilder, private router:Router,private route: ActivatedRoute,public nav: AppService) { }

  ngOnInit() {
  this.nav.show();

   this.myForm = this._formBuilder.group({
            name: [''],
            addresses: this._formBuilder.array([])
        });

   //      this.addAddress();

          this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  this.route.params.subscribe( params => this.edit_id = params);
  console.log(this.edit_id);
  
  if(this.edit_id.id){
   this.CampaignService.edit_campaign(this.edit_id.id).subscribe( res => {
   this.edit_data = res;
   localStorage.setItem("campaign_id",this.edit_id.id);
   console.log(this.edit_data);
   this.addAddressvalue(this.edit_data.triggers);

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
      this.id = 0;
    });
     }else{
      console.log("asin removed" + asin_data );
      this.CampaignService.asin_remove(asin_data).subscribe( res => {
       console.log(res);
       this.id = 1;
    });
     }
    }

   addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        if(control.controls.length <= 4){
        this.addrCtrl = this.initAddress();
        control.push(this.addrCtrl);
        }else{
                alert("more than 5 triggers are not allowed");
        }
    }

     initAddress() {
        return this._formBuilder.group({
            days: ['', Validators.required],
            trigger: ['', Validators.required]
        });
    }

    addAddressvalue(trigger) {
    console.log(trigger);
        const control = <FormArray>this.myForm.controls['addresses'];
        console.log(control.controls.length);
        if(control.controls.length <= 4){
        console.log(control.controls.length);
       for (let i in trigger) {
        this.addrCtrl = this.initAddressvalue(trigger[i]);
        control.push(this.addrCtrl);
        }
        }else{
                alert("more than 5 triggers are not allowed");
        }
    }


    initAddressvalue(trigger) {
    console.log(trigger);
        return this._formBuilder.group({
            days: [trigger.days, Validators.required],
            trigger: [trigger.trigger, Validators.required]
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

promotion_template(index){
  let dialogRef = this.dialog.open(EditTemplateEdit, {
                    width: '1000px',
                    disableClose: true,
                    data: {index: index}
                  });

                  dialogRef.afterClosed().subscribe(result => {
                  
                  });
}

}

@Component({
  selector: 'edit_template_edit',
  templateUrl: 'edit_template_edit.html',
  styleUrls: ['./../campaign-new/campaign-new.component.css']
})
export class EditTemplateEdit implements OnInit{

id: any;
name: string;

//editor
ckeConfig: any;
//ckeditorContent: any;
ckeditorContent: string = '<p>Some html</p>';
temp_data: any;

result1: any;

  constructor(
    public dialogRef: MatDialogRef<EditTemplateEdit>,public dialog: MatDialog,private CampaignService:CampaignService,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any


ngOnInit() {
this.id = localStorage.getItem("campaign_id");
  this.CampaignService.edit_campaign(this.id).subscribe( res => {
      this.temp_data = res;
      console.log(this.temp_data);
      console.log(this.data.index);
      console.log(this.temp_data.triggers[this.data.index].template_data);
      this.ckeditorContent = this.temp_data.triggers[this.data.index].template_data;
    });

}

  insert(event){
swal({
  title: 'Select Outage Tier',
  input: 'select',
  inputOptions: {
    '{{ Buyer Name}}': '{{ Buyer Name}}',
    '{{ order Id }}': '{{ Order Id }}',
    '{{ email }}': '{{ email }}',
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

  ok(ckeditorContent): void {
    console.log(ckeditorContent);
    this.id = localStorage.getItem("campaign_id");
  this.CampaignService.template_update(this.id,ckeditorContent,this.data.index).subscribe( res => {
   //   this.temp_data = res;
   //   console.log(this.temp_data);
      console.log(res);
   //   this.ckeditorContent = JSON.stringify(this.temp_data.triggers[this.data.index].template_data);
    });
     this.dialogRef.close(ckeditorContent);
  }

  onChange($event) {}
  onFocus($event) {}
  onBlur($event) {}
}