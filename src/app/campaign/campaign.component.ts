import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './campaign.service';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Customer, Address } from './trigger.interface';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  animal: string = "test";
  name: string = "test1";
  ckeditorContent:any;
  ckeConfig: any;
public  campaings: any[] = [];

  constructor(public dialog: MatDialog,private CampaignService:CampaignService) { }

  ngOnInit() {

  this.CampaignService.getcampaigns().subscribe( res => {
    this.campaings = res;
    });

this.ckeConfig = {
            height: 50,
            uiColor: '#ebebeb',
            language: "en",
            allowedContent: true,
            toolbar: [
            { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "RemoveFormat"] },
                { name: "editing", items: ["Scayt", "Find", "Replace", "SelectAll"] },
                { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
                { name: "tools", items: ["Maximize", "ShowBlocks", "Preview", "Print", "Templates"] },
                { name: "document", items: ["Source"] },
                { name: "insert", items: ["Image", "Table", "HorizontalRule", "SpecialChar", "Iframe", "imageExplorer"] },
                "/",
                { name: "paragraph", items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "CreateDiv", "-", "Blockquote"] },
                { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                { name: "styles", items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] }
            ]
        };


  this.ckeditorContent = `<p>My HTML</p>`;
  }

campaign_delete(id){
  this.CampaignService.delete_campaign(id).subscribe( res => {
    console.log(res);
    });
}

insert(event){
	//event.insertText("#{user_name}");
	event.insertText("{{Buyer_Name}}");
}

  onChange($event){}
  onFocus($event){}
  onBlur($event){}


enable(_id,event){
console.log(status);
  this.CampaignService.enable_campaign(_id,event.checked).subscribe( res => {
    console.log(res);
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
           console.log( result );
           this.animal = result;

              let dialogRef3 = this.dialog.open(CampaignAsin, {
                width: '1000px'
               });

              dialogRef3.afterClosed().subscribe(result => {
               console.log( result );
               this.animal = result;

                  let dialogRef4 = this.dialog.open(CampaignTrigger, {
                    width: '1000px',
                    disableClose: true
                  });

                  dialogRef4.afterClosed().subscribe(result => {
                    console.log(result);
                    this.campaings.push(result);
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
    //alert("are you sure?");
  }

ok(name): void {
localStorage.setItem("campaign",name);
     this.dialogRef1.close(name);
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
    console.log(res);
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
      console.log(res);
    });
     }else{
      console.log("asin removed" + asin_data );
      this.CampaignService.asin_remove(asin_data).subscribe( res => {
       console.log(res);
    });
     }
    }

  onNoClick(): void {
    this.dialogRef3.close();
  }

ok(): void {
     this.dialogRef3.close();
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
        
        /* subscribe to addresses value changes */
        // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    initAddress() {
        return this._fb.group({
            trigger: ['', Validators.required],
            days: ['']
        });
    }

    getTasks(myForm){
    return myForm.get('addresses').controls
  }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        const addrCtrl = this.initAddress();
        
        control.push(addrCtrl);
        
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
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
      this.dialogRef4.close(res);
    });
        // call API to save
    }


}