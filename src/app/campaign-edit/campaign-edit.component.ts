import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Customer, Address } from './../campaign/trigger.interface';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./../campaign-new/campaign-new.component.css']
})
export class CampaignEditComponent implements OnInit {

ckeConfig: any;
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
template_id: any;

triggerdata: any;
pass: boolean = true;
addrCtrl: any;

public myForm: FormGroup;
public formArray: any;

campaign_scroll: any;
page: any = 1;
enable_scroll: boolean = true;

search_page: number = 1;
filter_search: any;



dataSource = new MatTableDataSource;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns = ['image','title','asin','status'];

compainArray:any[] = [];
enable_asins:any;

values: string[] = ["ordered","shipped","delevered","returned"];

  constructor(public dialog: MatDialog,private CampaignService:CampaignService, private _formBuilder: FormBuilder, private router:Router,private route: ActivatedRoute,public nav: AppService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  this.nav.show();
   this.spinner.show();
   this.page = 1;
   this.search_page = 1;
  this.enable_scroll = true;
   this.myForm = this._formBuilder.group({
            name: [''],
            addresses: this._formBuilder.array([])
        });

   //      this.addAddress();

          this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
   //   secondCtrl: ['', Validators.required]
    });


  this.route.params.subscribe( params => this.edit_id = params);
  
  if(this.edit_id.id){
   this.CampaignService.edit_campaign(this.edit_id.id).subscribe( res => {
   this.edit_data = res;
   this.dataSource = new MatTableDataSource(this.edit_data);
   localStorage.setItem("campaign_id",this.edit_id.id);
   this.addAddressvalue(this.edit_data.triggers);

    });
    }
  this.CampaignService.getcampaigns().subscribe( res => {
    this.campaings = res;
    });

    this.CampaignService.gettemplates().subscribe( res => {
    this.templates = res;
    });

    this.CampaignService.getinventories(this.page).subscribe( res => {
    this.inventories = res;
   
    this.inventories = this.inventories.map(item => ({
      id: item.id,
  small_image: item.find_by_asin[0].small_image,
  asin: item.asin,
  sku: item.sku,
  title: item.find_by_asin[0].title,
  price_paisas: item.price_paisas,
  quantity: item.quantity,
  enable: item.enable,
  children_in_use: item.children_in_use
}));
this.dataSource = new MatTableDataSource(this.inventories);
this.spinner.hide();
    });

    //sarath
    this.CampaignService.asin_enable_asins(this.edit_id.id).subscribe( res => {
      this.enable_asins = res;
      for(let i in this.enable_asins){
        this.compainArray.push(this.enable_asins[i]);
      }
      console.log(this.compainArray);
      
      });
    
   

  }

  campaign_name_uniq(name){
      this.CampaignService.name_uniq(name).subscribe( res => {
      if(res){
        swal(
            'Alert!',
            'Campaign name aleredy in use!',
            'warning'
             )
        this.name = '';
        }
     });
    }


  name_ok(name): void {
   // alert(name);
localStorage.setItem("campaign",name);
    // this.dialogRef1.close(name);
  }

  close(){
   this.router.navigate(['campaign']);  
  }

  applyFilter(filterValue: string) {
      if(filterValue.length > 2){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.search_page = 1;
    this.filter_search = filterValue;
    this.CampaignService.inventory_search(filterValue,this.search_page).subscribe( res => {
      this.inventories = res;
      this.inventories = this.inventories.map(item => ({
      id: item.id,
  small_image: item.find_by_asin[0].small_image,
  asin: item.asin,
  sku: item.sku,
  title: item.find_by_asin[0].title,
  price_paisas: item.price_paisas,
  quantity: item.quantity,
  enable: item.enable,
  children_in_use: item.children_in_use
}));
  this.enable_scroll = false;
   this.dataSource = new MatTableDataSource(this.inventories);
   });
  }else{
    if(filterValue.length == 0){
       this.ngOnInit();
    }
  }
   // this.dataSource.filter = filterValue;
   // this.inventories = this.dataSource.filteredData;
  }

  bulk_push: any[] = [];
  bulk_remove: any[]= [];

   enable_all($event,inventories){
   if(!(this.enable_scroll)){
      if($event .checked){
        this.bulk_push = [];
       this.inventories.filter((invent) => invent.children_in_use == false).map((data) => { 
        data.children_in_use = "$event.checked",this.bulk_push.push(data.asin)});
        this.CampaignService.bulk_asin_push(this.bulk_push).subscribe( res => {
       });
       console.log(this.edit_data.asin);
       this.bulk_push.map((data) => { this.edit_data.asin.push(data) }); 
       }else{
       this.bulk_remove = [];
       this.inventories.filter((invent) => invent.children_in_use == "$event.checked").map((data) => { 
       data.children_in_use = $event.checked,this.bulk_remove.push(data.asin)});
       this.CampaignService.asin_remove(this.bulk_remove).subscribe( res => {
    });
       }
      }else{
      if($event.checked){
       this.inventories.filter((invent) => invent.children_in_use == false).map((data) => { 
        data.children_in_use = "$event.checked"});
        this.CampaignService.enable_all().subscribe( res => {
       });
       }else{
      this.inventories.filter((invent) => invent.children_in_use == "$event.checked").map((data) => { 
       data.children_in_use = $event.checked});
        this.CampaignService.disable_all().subscribe( res => {
       });
       }
      }
    }


  onScroll(e) {
   const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 400;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
    console.log(this.page);
   if(this.enable_scroll && this.inventories.length == (20*this.page)){
    this.page = this.page + 1;
    this.CampaignService.getinventories(this.page).debounceTime(200).throttleTime(50).subscribe( res => {
      this.campaign_scroll = res;
      this.campaign_scroll = this.campaign_scroll.map(item => ({
      id: item.id,
  small_image: item.find_by_asin[0].small_image,
  asin: item.asin,
  sku: item.sku,
  title: item.find_by_asin[0].title,
  price_paisas: item.price_paisas,
  quantity: item.quantity,
  enable: item.enable,
  children_in_use: item.children_in_use
}));

   this.campaign_scroll.map(item => this.inventories.push(item));
   this.dataSource = new MatTableDataSource(this.inventories);
   });
   }

   else if(!this.enable_scroll && this.inventories.length == (20*this.search_page)){
    this.search_page = this.search_page + 1;
    this.CampaignService.inventory_search(this.filter_search,this.search_page).debounceTime(200).throttleTime(50).subscribe( res => {
    this.campaign_scroll = res;
    this.campaign_scroll = this.campaign_scroll.map(item => ({
    id: item.id,
    small_image: item.find_by_asin[0].small_image,
    asin: item.asin,
    sku: item.sku,
    title: item.find_by_asin[0].title,
    price_paisas: item.price_paisas,
    quantity: item.quantity,
    enable: item.enable,
    children_in_use: item.children_in_use
  }));
   this.campaign_scroll.map(item => this.inventories.push(item));
   this.dataSource = new MatTableDataSource(this.inventories);
   });
   }

   }
}


  template_data(template,event): void {
  if (event.checked){
  this.id = template.id;
  this.template_id = template;
  /*this.id = template.id;
    this.CampaignService.campaign_create(template.id).subscribe( res => {
    let camp_id:any = res;
    localStorage.setItem("campaign_id",camp_id);
    });*/
    }else{
     this.id = 0;
    }
  }

   edit_template(){
  this.CampaignService.campaign_create(this.template_id.id).subscribe( res => {
    let camp_id:any = res;
    localStorage.setItem("campaign_id",camp_id);
    });
    }


    edit_asinarray(){

      //this.edit_id.id;
     
    }
    
  asin(event,asin_data){
    console.log(asin_data);
    if (event.checked){
    this.compainArray.push(asin_data);
    }else{
      const index = this.compainArray.findIndex(order => order === asin_data);
      console.log(index);
      this.compainArray.splice(index,1);
    }
    console.log(this.compainArray);
    // if (event.checked){
    //  console.log("asin added" + asin_data );
    //  this.CampaignService.asin_push(asin_data).subscribe( res => {
    //   this.id = 0;
    // });
    //  }else{
    //   console.log("asin removed" + asin_data );
    //   this.CampaignService.asin_remove(asin_data).subscribe( res => {
    //    this.id = 1;
    // });
    //  }
    }

    asin_array_push(){
      this.CampaignService.asin_enable_push(this.compainArray).subscribe( res => {
            console.log(res);
            //this.compainArray=[];
         });
    }


   addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        if(control.controls.length <= 4){
        this.addrCtrl = this.initAddress();
        control.push(this.addrCtrl);
       this.CampaignService.trigger_push(this.edit_id.id).subscribe( res => {
    });

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
        const control = <FormArray>this.myForm.controls['addresses'];
        console.log(control.controls.length);
        if(control.controls.length <= 4){
       for (let i in trigger) {
        this.addrCtrl = this.initAddressvalue(trigger[i]);
        control.push(this.addrCtrl);
        }
        }else{
                alert("more than 5 triggers are not allowed");
        }
    }


    initAddressvalue(trigger) {
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
        console.log(i);
        this.CampaignService.trigger_remove(this.edit_id.id,i).subscribe( res => {
    });
    }

save(myForm) {
     this.CampaignService.campaign_update(myForm.value.addresses).subscribe( res => {
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
  selector: 'edit_template',
  templateUrl: 'edit_template_edit.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class EditTemplateEdit implements OnInit{

id: any;
name: string;

//editor
ckeConfig: any;
//ckeditorContent: string;
ckeditorContent: string;
temp_data: any;
subject: any;

result1: any;

  constructor(
    public dialogRef: MatDialogRef<EditTemplateEdit>, public dialogReftag: MatDialogRef<SelectTag>,public dialog: MatDialog,private CampaignService:CampaignService,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any


ngOnInit() {

this.id = localStorage.getItem("campaign_id");
  this.CampaignService.edit_campaign(this.id).subscribe( res => {
      this.temp_data = res;
      this.subject = this.temp_data.triggers[this.data.index].subject;
      this.ckeditorContent = this.temp_data.triggers[this.data.index].template_data;
    });

    this.ckeConfig = {
            height: 400,
            uiColor: "#ebebeb",
            language: "en",
            allowedContent: true,
            toolbar: [
            { name: "documenthandling", items: ["imageExplorer"] },
            { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
                { name: "clipboard", items: ["Undo", "Redo"] },
                { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                { name: "styles", items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] }
            ]
        };
}

  insert(event){
swal({
  title: 'List of Tags',
  input: 'select',
  inputOptions: {
    '{{Buyer Name}}': '{{Buyer Name}}',
    '{{Order Id}}': '{{Order Id}}',
    '{{Merchant_id}}': '{{Merchant_id}}',
    '{{Product Title}}': '{{Product Title}}',
    '{{ASIN}}': '{{ASIN}}',
    '{{Review Link}}': '{{Review Link}}'
  },
  inputPlaceholder: 'Choose a Tag',
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

  sub_add(){
    let dialogReftag = this.dialog.open(SelectTag, {
                    width: '1000px',
                    disableClose: false
                  });

                  dialogReftag.afterClosed().subscribe(result => {
                      if(result){
                      this.subject = this.subject.concat(result); 
                      }
                  });
  }

 onNoClick(): void {
    this.dialogRef.close();
  }

  ok(ckeditorContent): void {
    this.id = localStorage.getItem("campaign_id");
  this.CampaignService.template_update(this.id,ckeditorContent,this.data.index).subscribe( res => {
  this.temp_data = res;
    this.ckeditorContent = this.temp_data.triggers[this.data.index].template_data;
    });
     this.dialogRef.close(ckeditorContent);
  }

  subject_change(subject){
    this.CampaignService.subject_update(this.id,subject,this.data.index).subscribe( res => {
    });
  }

  onChange($event) {}
  onFocus($event) {}
  onBlur($event) {}
}

@Component({
  selector: 'select_tag',
  template: `<h1 mat-dialog-title>List of Tags</h1>
<div mat-dialog-content>
  <!--p>List of Tags</p-->
  <mat-form-field>
    <mat-select placeholder="Choose a Tag" (change)="select_tag($event)">
                <mat-option *ngFor="let drop of drops" [value]="drop"> {{ drop }} </mat-option>
              </mat-select>
  </mat-form-field>
</div>
<!--div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button cdkFocusInitial>Ok</button>
</div-->`,
})
export class SelectTag implements OnInit {

tag: any;
drops: any = ["{{Buyer Name}}","{{Order Id}}","{{Merchant_id}}","{{Product Title}}","{{ASIN}}"];

  constructor(
    public dialogReftag: MatDialogRef<SelectTag>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    
    }

    select_tag(event){
       console.log(event.value);
       this.tag = event.value;
       this.dialogReftag.close(this.tag);
    }




   // onNoClick(){
   //  this.dialogReftag.close();
   // }

}