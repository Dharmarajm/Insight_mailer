import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PromotionService } from './promotion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

public promotions: any;
min_date: any;
start_date: any[] = [];
end_date: any[] = [];
data_enable: any; 
previewSelected: any;
data: any;
edit_data: any;

dataSource = new MatTableDataSource;

  constructor(public dialog: MatDialog,private PromotionService:PromotionService) { }

  ngOnInit() {
  this.PromotionService.getpromotion().subscribe( res => {
      this.promotions = res;
      this.dataSource = new MatTableDataSource(this.promotions);
    });
    this.min_date = new Date()
    //  this.showSelected = true;
  }

promotion_edit(id){
alert(id);
  this.PromotionService.edit_promotion(id).subscribe( res => {
    console.log(res);
    this.edit_data = res;
    localStorage.setItem('edit_data', this.edit_data);
let dialogRef1 = this.dialog.open(SelectPromotion, {
                    width: '1000px',
                    disableClose: true
                  });

                  dialogRef1.afterClosed().subscribe(result1 => {
                    
                   // if(result1){
let dialogRef2 = this.dialog.open(CreatePromotion, {
                    width: '1000px',
                    disableClose: true,
                    data: { id:  this.edit_data.inventory.id }
                  });

                  dialogRef2.afterClosed().subscribe(result2 => {
                       //this.promotions.unshift(result2);
                  });
//}
                  });


    });
}

promotion_delete(id,index){

  this.PromotionService.delete_promotion(id).subscribe( res => {
    console.log(res);
     this.promotions.splice(index, 1);
    });
}

enable(event,id,inventory_id){
  console.log(this.start_date,this.end_date);
  this.data = { id: id,inventory_id: inventory_id,enable: event.checked,from_date: this.start_date,to_date: this.end_date }
  this.PromotionService.promotion_enable(this.data).subscribe( res => {
      this.data_enable = res;
    });
}

promotion(){
  alert("promoted");
}

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.promotions = this.dataSource.filteredData;
    console.log(this.dataSource.filteredData);
  }

promotion_preview(data){

let dialogRefprev = this.dialog.open(TemplatePreview, {
                    width: '1000px',
                    disableClose: true,
                    data: {data: data}
                  });

                  dialogRefprev.afterClosed().subscribe(result1 => {

                  })

                  }


promote(){

 let dialogRef1 = this.dialog.open(SelectPromotion, {
                    width: '1000px',
                    disableClose: true
                  });

                  dialogRef1.afterClosed().subscribe(result1 => {
                    
                    if(result1){
let dialogRef2 = this.dialog.open(CreatePromotion, {
                    width: '1000px',
                    disableClose: true,
                    data: { id:  result1 }
                  });

                  dialogRef2.afterClosed().subscribe(result2 => {
                       this.promotions.unshift(result2);
                  });
}
                  });
	
}

}



@Component({
  selector: 'select_promotion',
  templateUrl: 'select_promotion.html',
})
export class SelectPromotion {

name: string;
inventories: any;
id: number = 0;
edit_data1: any;
  constructor(
    public dialogRef1: MatDialogRef<SelectPromotion>,private PromotionService:PromotionService) { } //,@Inject(MAT_DIALOG_DATA) public data: any

ngOnInit() {
  this.edit_data1 = localStorage.getItem('edit_data');
      this.PromotionService.getinventories().subscribe( res => {
      this.inventories = res;
    });
  }

asin(event,num){
if (event.checked){
  this.id = num;
  }else{
  this.id = 0;
  }

}

  cancel(): void {
    alert("sure");
    this.dialogRef1.close();
  }

ok(name): void {
     this.dialogRef1.close(this.id);
  }


}



@Component({
  selector: 'create_promotion',
  templateUrl: 'create_promotion.html',
})
export class CreatePromotion {

name: string;
edit_data1: any;
  

  data1:any;
  public PromotionForm: FormGroup;
  public myGroup: FormGroup;


  constructor(
    public dialogRef2: MatDialogRef<CreatePromotion>,private PromotionService:PromotionService,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    alert("sure");
  }

  promotion(myPromotionForm){
  
   console.log(myPromotionForm);
   this.PromotionService.create_promotion(myPromotionForm,this.data.id).subscribe( res => {
      this.dialogRef2.close(res);
    });

  }

  cancel(){
   alert("promotion not created");
   this.dialogRef2.close();
  }



  ngOnInit() {
  this.edit_data1 = localStorage.getItem('edit_data');
      this.PromotionService.getdata(this.data.id).subscribe( res => {
      this.data1 = res;

    });

     this.myGroup = new FormGroup({ firstName: new FormControl() });
     this.PromotionForm = new FormGroup({
            product_asin: new FormControl(''),
            product_title: new FormControl(''),
            product_price: new FormControl(''),
            discount_price: new FormControl('',Validators.required),
            product_description: new FormControl(''),
            personal_msg: new FormControl('',Validators.required),
            promotion_title: new FormControl('',Validators.required),
            coupon_code: new FormControl('',Validators.required),
            support_email: new FormControl('',Validators.required),
            mail_frequency: new FormControl('',Validators.required)
         });

         //product_category: new FormControl(''),
         //product_description: new FormControl(''),
  }

ok(name): void {
     this.dialogRef2.close();
  }


}


@Component({
  selector: 'template_preview',
  templateUrl: 'template_preview.html',
  styleUrls: ['./promotion.component.css']
})
export class TemplatePreview {

promotion_template: any;

  constructor(
    public dialogRefprev: MatDialogRef<TemplatePreview>,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any


ok(): void {
     this.dialogRefprev.close();
  }


}

