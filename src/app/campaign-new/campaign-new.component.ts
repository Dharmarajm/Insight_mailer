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
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.css']
})
export class CampaignNewComponent implements OnInit {

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
addrCtrl: any;

public myForm: FormGroup;
public formArray: any;


values: string[] = ["ordered","shipped","delevered","returned"];

  constructor(public dialog: MatDialog,private CampaignService:CampaignService, private _formBuilder: FormBuilder, private router:Router,private route: ActivatedRoute,public nav: AppService) { }

 /* ckeConfig = {
            height: 50,
            uiColor: "#ebebeb",
            language: "en",
            allowedContent: true,
            toolbar: [
                { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
                { name: "editing", items: ["Find", "Replace", "SelectAll"] },
                { name: "clipboard", items: ["Cut", "Copy", "Paste", "Undo", "Redo"] },
                { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                { name: "styles", items: ["imageExplorer","Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] },
            ]
        };*/
        

  ngOnInit() {
  this.nav.show();
  this.route.params.subscribe( params => this.edit_id = params);
  console.log(this.edit_id);
  if(this.edit_id.id){
   this.CampaignService.edit_campaign(this.edit_id.id).subscribe( res => {
   this.edit_data = res;
   console.log(this.edit_data);
   this.addAddressvalue(this.edit_data.triggers);
    });
    }
  this.CampaignService.getcampaigns().subscribe( res => {
    this.campaings = res;
    });

    this.CampaignService.gettemplates().subscribe( res => {
    this.templates = res;
    //console.log(res);
    });

    this.CampaignService.getinventories().subscribe( res => {
    this.inventories = res;
    });
    
 this.myForm = this._formBuilder.group({
            name: [''],
            addresses: this._formBuilder.array([])
        });

        // this.addAddress();

          this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
   // this.thirdFormGroup = this._formBuilder.group({
   //   thirdCtrl: ['', Validators.required]
   // });

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
    let trigger = template;
    this.addAddressvalue(trigger);
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
        //addrCtrl.controls.get('days').setValue('yourEmailId@gmail.com');
        const addrCtrl = this.initAddress();
        control.push(addrCtrl);
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
        this.myForm.reset();
        const control = <FormArray>this.myForm.controls['addresses'];
        control.controls = [];
        if(control.controls.length <= trigger.email_limit){
        for (let i in trigger.events) {
        this.addrCtrl = this.initAddressvalue(trigger.events[i]);
        //this.temp_data = trigger.events[i];
        //this.addrCtrl.controls.push(new FormControl('template_data'));
        control.push(this.addrCtrl);
        }
        }else{
                alert("more than 5 triggers are not allowed");
        }
    }


    initAddressvalue(trigger) {
        return this._formBuilder.group({
            days: [trigger.days, Validators.required],
            trigger: [trigger.triggers, Validators.required]
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
      console.log(myForm.value);
     this.CampaignService.campaign_update(myForm.value.addresses).subscribe( res => {
      console.log(res);
      this.campaings.push(res);
      this.router.navigate(['campaign']);
    });
}

promotion_template(index){
  let dialogRef = this.dialog.open(EditTemplate, {
                    width: '1000px',
                    disableClose: true,
                    data: {index: index}
                  });

                  dialogRef.afterClosed().subscribe(result => {
                  console.log(index);
                  console.log(result);
                  });
}

}



@Component({
  selector: 'edit_template',
  templateUrl: 'edit_template.html',
  styleUrls: ['./campaign-new.component.css']
})
export class EditTemplate implements OnInit{

id: any;
name: string;

//editor
ckeConfig: any;
//ckeditorContent: any;
ckeditorContent: string = '<p>Some html</p>';
temp_data: any;

result1: any;

  constructor(
    public dialogRef: MatDialogRef<EditTemplate>,public dialog: MatDialog,private CampaignService:CampaignService,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any


ngOnInit() {
this.id = localStorage.getItem("campaign_id");
  this.CampaignService.edit_campaign(this.id).subscribe( res => {
      this.temp_data = res;
      console.log(this.temp_data);
      console.log(this.data.index);
      this.ckeditorContent = JSON.stringify(this.temp_data.triggers[this.data.index].template_data);
    });

this.ckeConfig = {
            height: 400,
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
        };


}

  insert(event){
swal({
  title: 'Select Outage Tier',
  input: 'select',
  inputOptions: {
    '{{ Buyer Name}}': '{{ Buyer Name}}',
    '{{ order Id }}': '{{ Order Id }}',
    '{{ Product Title }}': '{{ Product Title }}',
    '{{ Product Link }}': '{{ Product Link }}',
    '{{ ASIN }}': '{{ ASIN }}'
  },
  inputPlaceholder: 'required',
  showCancelButton: true,
   inputValidator: function (value) {
    return new Promise(function (resolve, reject) {
      if (value !== '') {
        resolve();
      } else {
        reject('You need to select a Tag');
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

edited_data: any;

  ok(ckeditorContent): void {
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

@Component({
  selector: 'detail_template',
  templateUrl: 'detail_template.html',
  styleUrls: ['./campaign-new.component.css']
})
export class DetailTemplate {

//data: string[] = ["name","address","jkhbhjk","ggvgvgvj"];

data: any;

  constructor(
    public dialogRefdata: MatDialogRef<DetailTemplate>) {
         this.data = "hghj";
     } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    this.dialogRefdata.close();
  }

  ok(datum): void {
  //console.log("datum");
  //this.zone.run(() => this.dialogRef.close());
     this.dialogRefdata.close();
  }

}
