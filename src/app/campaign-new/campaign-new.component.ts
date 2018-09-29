import { Component, OnInit, Inject } from '@angular/core';
import { CampaignService } from './../campaign/campaign.service';
import { AppService } from './../app.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  isLinear = true;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  templates: any;
  inventories: any;
  edit_id: any;
  edit_data: any;
  id: number = 0;
  name: any;
  addrCtrl: any;
  camp_id: any;
  template_id: any;

  public myForm: FormGroup;
  public formArray: any;

  campaign_scroll: any;
  page: any = 1;
  enable_scroll: boolean = true;

  search_page: number = 1;
  filter_search: any;

  compainArray: any[] = [];


  dataSource = new MatTableDataSource;

  values: string[] = ["ordered", "shipped", "delevered", "returned"];

  constructor(public dialog: MatDialog, private CampaignService: CampaignService, private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public nav: AppService) { }


  ngOnInit() {
    this.nav.show();
    this.page = 1;
    this.search_page = 1;
    this.enable_scroll = true;
    this.route.params.subscribe(params => this.edit_id = params);
    console.log(this.edit_id);
    if (this.edit_id.id) {
      this.CampaignService.edit_campaign(this.edit_id.id).subscribe(res => {
        this.edit_data = res;
        console.log(this.edit_data);
        this.addAddressvalue(this.edit_data.triggers);
      });
    }
    this.CampaignService.getcampaigns().subscribe(res => {
      this.campaings = res;
    });

    this.CampaignService.gettemplates().subscribe(res => {
      this.templates = res;
      //console.log(res);
    });

    this.CampaignService.getinventories(this.page).subscribe(res => {
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
        children_in_use: item.children_in_use,
        campaign_id: item.campaign_id
      }));
      this.dataSource = new MatTableDataSource(this.inventories);
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
    this.thirdFormGroup = this._formBuilder.group({

    });

  }

  campaign_name_uniq(name) {
    this.CampaignService.name_uniq(name).subscribe(res => {
      if (res) {
        swal(
          'Alert!',
          'Campaign name aleredy in use!',
          'warning'
        )
        this.name = '';
      }
    });
  }

  bulk_push: any[] = [];
  bulk_remove: any[] = [];
  

  enable_all($event, inventories) {

    console.log($event.checked,this.filter_search)
    //sarath
    if ($event.checked ) {

      if(this.filter_search !=null) { 
      this.compainArray=[];
      this.CampaignService.search_enable(this.filter_search).subscribe(res => {
        console.log(res);
        //alert(res);
        for(let a in res){
          this.compainArray.push(res[a]);
         // this.bulk_push.push(res[a])
        }
        
        this.bulk_push = [];
        this.inventories.filter((invent) => invent.children_in_use == false).map((data) => {
          data.children_in_use = "$event.checked", this.bulk_push.push(data.asin)
        });
        this.CampaignService.bulk_asin_push(this.bulk_push).subscribe(res => {
          console.log(res);
        });
     
      console.log(this.compainArray);
    })
  }
    }else{
      //this.compainArray=[];
    }

    if (!(this.enable_scroll)) {
      console.log($event.checked, inventories)
      if ($event.checked) {
        // this.bulk_push = [];
        // this.inventories.filter((invent) => invent.children_in_use == false).map((data) => {
        //   data.children_in_use = "$event.checked", this.bulk_push.push(data.asin)
        // });
        // this.CampaignService.bulk_asin_push(this.bulk_push).subscribe(res => {
        //   console.log(res);
        // });
      } else {
        this.bulk_remove = [];
        this.inventories.filter((invent) => invent.children_in_use == "$event.checked").map((data) => {
          data.children_in_use = $event.checked, this.bulk_remove.push(data.asin)
        });
        this.CampaignService.asin_remove(this.bulk_remove).subscribe(res => {
          console.log(res);
        });
      }
      console.log(this.bulk_push);
      console.log(this.bulk_remove);
    } else {
      if ($event.checked) {
        this.inventories.filter((invent) => invent.children_in_use == false).map((data) => {
          data.children_in_use = "$event.checked"
        });
        this.CampaignService.enable_all().subscribe(res => {
          console.log(res);
        });
      } else {
        this.inventories.filter((invent) => invent.children_in_use == "$event.checked").map((data) => {
          data.children_in_use = $event.checked
        });
        this.CampaignService.disable_all().subscribe(res => {
          console.log(res);
        });
      }
    }
  }


  name_ok(name): void {
    localStorage.setItem("campaign", name);
    // this.dialogRef1.close(name);
  }

  close() {
    this.router.navigate(['campaign']);
  }

  applyFilter(filterValue: string) {

     
    if (filterValue.length > 2) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

      


      this.search_page = 1;
      this.filter_search = filterValue;
      this.CampaignService.inventory_search(filterValue, this.search_page).subscribe(res => {
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
          children_in_use: item.children_in_use,
          campaign_id: item.campaign_id
        }));
        this.enable_scroll = false;
        this.dataSource = new MatTableDataSource(this.inventories);
      });
    } else {
      if (filterValue.length == 0) {
        this.ngOnInit();
      }
    }

    //this.dataSource.filter = filterValue;
    //this.inventories = this.dataSource.filteredData;
  }

  onScroll(e) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 400;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if (this.enable_scroll && this.inventories.length == (20 * this.page)) {
        this.page = this.page + 1;
        this.CampaignService.getinventories(this.page).debounceTime(200).throttleTime(50).subscribe(res => {
          this.campaign_scroll = res;
          console.log(res);
          this.campaign_scroll = this.campaign_scroll.map(item => ({
            id: item.id,
            small_image: item.find_by_asin[0].small_image,
            asin: item.asin,
            sku: item.sku,
            title: item.find_by_asin[0].title,
            price_paisas: item.price_paisas,
            quantity: item.quantity,
            enable: item.enable,
            children_in_use: item.children_in_use,
            campaign_id: item.campaign_id
          }));
          this.campaign_scroll.map(item => this.inventories.push(item));
          this.dataSource = new MatTableDataSource(this.inventories);

         
        });
      }

      else if (!this.enable_scroll && this.inventories.length == (20 * this.search_page)) {
        this.search_page = this.search_page + 1;
        this.CampaignService.inventory_search(this.filter_search, this.search_page).debounceTime(200).throttleTime(50).subscribe(res => {
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
            children_in_use: item.children_in_use,
            campaign_id: item.campaign_id
          }));
          this.campaign_scroll.map(item => this.inventories.push(item));
          this.dataSource = new MatTableDataSource(this.inventories);
          if (this.filter_search.length > 2) {
            this.inventories.filter((invent) => invent.children_in_use == false).map((data) => {
              data.children_in_use = "$event.checked", this.bulk_push.push(data.asin)
            });
            this.CampaignService.bulk_asin_push(this.bulk_push).subscribe(res => {
              console.log(res);
            });
          }
        });
      }

    }
  }


  template_data(template, event): void {
    if (event.checked) {
      this.template_id = template;
      this.id = template.id;
      /* this.id = template.id;
       this.CampaignService.campaign_create(template.id).subscribe( res => {
         let camp_id:any = res;
         this.camp_id = res;
         localStorage.setItem("campaign_id",camp_id);
         let trigger = template;
         this.addAddressvalue(trigger);
         });*/
    } else {
      this.id = 0;
    }
  }


  // newly created for avoiding creation of multiple campaign 
  create_template() {

    this.CampaignService.campaign_create(this.template_id.id).subscribe(res => {
      let camp_id: any = res;
      this.camp_id = res;
      localStorage.setItem("campaign_id", camp_id);
      let trigger = this.template_id;
      this.addAddressvalue(trigger);
    });

  }

  
  asin(event, asin_data) {
    console.log(asin_data);
    if (event.checked) {
      this.compainArray.push(asin_data);
    } else {
      const index = this.compainArray.findIndex(order => order === asin_data);
      console.log(index);
      this.compainArray.splice(index, 1);
    }
    console.log(this.compainArray);
    // if (event.checked){
    //  console.log("asin added" + asin_data );
    //  this.CampaignService.asin_push(asin_data).subscribe( res => {
    //   console.log(res);
    // });
    //  }else{
    //   console.log("asin removed" + asin_data );
    //   this.CampaignService.asin_remove(asin_data).subscribe( res => {
    //    console.log(res);
    // });
    //  }
  }

  asin_array_push() {

    console.log(this.compainArray);
    if(this.compainArray.length !=0){ 
    this.CampaignService.asin_bluk_push(this.compainArray).subscribe(res => {
      console.log(res);
      this.compainArray = [];
    });
  }
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];

    if (control.controls.length <= 4) {
      //addrCtrl.controls.get('days').setValue('yourEmailId@gmail.com');
      const addrCtrl = this.initAddress();
      control.push(addrCtrl);
      this.CampaignService.trigger_push(this.camp_id).subscribe(res => {
        console.log(res);
      });

    } else {
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
    if (control.controls.length <= trigger.email_limit) {
      for (let i in trigger.events) {
        this.addrCtrl = this.initAddressvalue(trigger.events[i]);
        //this.temp_data = trigger.events[i];
        //this.addrCtrl.controls.push(new FormControl('template_data'));
        control.push(this.addrCtrl);
      }
    } else {
      alert("more than 5 triggers are not allowed");
    }
  }


  initAddressvalue(trigger) {
    return this._formBuilder.group({
      days: [trigger.days, Validators.required],
      trigger: [trigger.triggers, Validators.required]
    });
  }


  getTasks(myForm) {
    return myForm.get('addresses').controls
  }

  removeAddress(i: number) {

    this.CampaignService.trigger_remove(this.camp_id, i).subscribe(res => {
      console.log(res);
    });
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);

  }

  save(myForm) {
    console.log(myForm.value);
    this.CampaignService.campaign_update(myForm.value.addresses).subscribe(res => {
      console.log(res);
      this.campaings.push(res);
      this.router.navigate(['campaign']);
    });
  }

  promotion_template(index) {
    let dialogRef = this.dialog.open(EditTemplate, {
      width: '1000px',
      disableClose: true,
      data: { index: index }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(index);
      //console.log(result);
    });
  }

}



@Component({
  selector: 'edit_template',
  templateUrl: 'edit_template.html',
  styleUrls: ['./campaign-new.component.css']
})
export class EditTemplate implements OnInit {

  id: any;
  name: string;

  //editor
  ckeConfig: any;
  //ckeditorContent: any;
  ckeditorContent: string;
  temp_data: any;
  subject: any;

  result1: any;

  constructor(
    public dialogRef: MatDialogRef<EditTemplate>, public dialogReftag: MatDialogRef<SelectTagNew>, public dialog: MatDialog, private CampaignService: CampaignService, @Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any


  ngOnInit() {
    this.id = localStorage.getItem("campaign_id");
    this.CampaignService.edit_campaign(this.id).subscribe(res => {
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

  insert(event) {
    swal({
      title: 'List of Tags',
      input: 'select',
      inputOptions: {
        '{{Buyer Name}}': '{{Buyer Name}}',
        '{{Order Id}}': '{{Order Id}}',
        '{{Product Title}}': '{{Product Title}}',
        '{{Product Link}}': '{{Product Link}}',
        '{{ASIN}}': '{{ASIN}}'
      },
      inputPlaceholder: 'Choose a Tag',
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

  sub_add() {
    let dialogReftagNew = this.dialog.open(SelectTagNew, {
      width: '1000px',
      disableClose: false
    });

    dialogReftagNew.afterClosed().subscribe(result => {
      if (result) {
        this.subject = this.subject.concat(result);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edited_data: any;

  ok(ckeditorContent): void {
    console.log(JSON.stringify(ckeditorContent));
    this.id = localStorage.getItem("campaign_id");
    this.CampaignService.template_update(this.id, ckeditorContent, this.data.index).subscribe(res => {
      this.temp_data = res;
      this.ckeditorContent = this.temp_data.triggers[this.data.index].template_data;
    });
    this.dialogRef.close(ckeditorContent);
  }

  subject_change(subject) {
    console.log(this.id);
    this.CampaignService.subject_update(this.id, subject, this.data.index).subscribe(res => {
      console.log(res);
    });
  }


  onChange($event) { }
  onFocus($event) { }
  onBlur($event) { }


}

@Component({
  selector: 'detail_template',
  templateUrl: 'detail_template.html',
  styleUrls: ['./campaign-new.component.css']
})
export class DetailTemplate {

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

@Component({
  selector: 'select_tag_new',
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
export class SelectTagNew implements OnInit {

  tag: any;
  drops: any = ["{{Buyer Name}}", "{{Order Id}}", "{{Merchant_id}}", "{{Product Title}}", "{{ASIN}}"];

  constructor(
    public dialogReftagnew: MatDialogRef<SelectTagNew>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  select_tag(event) {
    this.tag = event.value;
    this.dialogReftagnew.close(this.tag);
  }




  // onNoClick(){
  //  this.dialogReftag.close();
  // }

}
