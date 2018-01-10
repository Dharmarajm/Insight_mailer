import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './campaign.service';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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


  constructor(public dialog: MatDialog,private campaign_service:CampaignService) { }

  ngOnInit() {

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


insert(event){
	//event.insertText("#{user_name}");
	event.insertText("{{Buyer_Name}}");
}

  onChange($event){}
  onFocus($event){}
  onBlur($event){}


openDialog(): void {
    let dialogRef1 = this.dialog.open(CampaignName, {
      width: '500px'
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log( result );
      this.animal = result;

          let dialogRef2 = this.dialog.open(CampaignTemplate, {
            width: '1000px'
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
                    width: '1000px'
                  });

                  dialogRef4.afterClosed().subscribe(result => {
                    console.log( result );
                    this.animal = result;
                  });



                });






           });



     });


  }


}


@Component({
  selector: 'campaign_name',
  templateUrl: 'campaign_name.html',
})
export class CampaignName {

name: string;

  constructor(
    public dialogRef1: MatDialogRef<CampaignName>) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    alert("sure");
  }

ok(name): void {
     this.dialogRef1.close();
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

  onNoClick(): void {
    this.dialogRef3.close();
  }

ok(): void {
     
  }


}

@Component({
  selector: 'campaign_trigger',
  templateUrl: 'campaign_trigger.html',
})
export class CampaignTrigger {

  constructor(
    public dialogRef4: MatDialogRef<CampaignTrigger>,
    @Inject(MAT_DIALOG_DATA) public data: any,private campaign_service:CampaignService) { }

  onNoClick(): void {
    this.dialogRef4.close();
  }

ok(): void {
     
  }


}