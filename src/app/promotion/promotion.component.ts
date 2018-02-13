import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PromotionService } from './promotion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

promotions: any;

  constructor(public dialog: MatDialog,private PromotionService:PromotionService) { }

  ngOnInit() {
  this.PromotionService.getpromotion().subscribe( res => {
      this.promotions = res;
    });
  }

enable(id,event){
  console.log(id,event.checked);
}

promotion(){
  alert("promoted");
}

promote(){

 let dialogRef1 = this.dialog.open(SelectPromotion, {
                    width: '1000px'
                  });

                  dialogRef1.afterClosed().subscribe(result1 => {
                    alert(result1);
let dialogRef2 = this.dialog.open(CreatePromotion, {
                    width: '1000px',
                    data: { id:  result1 },
                  });

                  dialogRef2.afterClosed().subscribe(result2 => {
                    //alert("result");
                  });

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

  constructor(
    public dialogRef1: MatDialogRef<SelectPromotion>,private PromotionService:PromotionService) { } //,@Inject(MAT_DIALOG_DATA) public data: any

ngOnInit() {
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

  

  data1:any;
  public PromotionForm: FormGroup;
  public myGroup: FormGroup;


  constructor(
    public dialogRef2: MatDialogRef<CreatePromotion>,private PromotionService:PromotionService,@Inject(MAT_DIALOG_DATA) public data: any) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    alert("sure");
  }

  promotion(myPromotionForm){
  alert(this.data.id)
   console.log(myPromotionForm);
   this.PromotionService.create_promotion(myPromotionForm,this.data.id).subscribe( res => {
      alert("res");
    });

  }

  cancel(){
   alert("promotion not created");
   this.dialogRef2.close();
  }



  ngOnInit() {
      this.PromotionService.getdata(this.data.id).subscribe( res => {
      this.data1 = res;
    });

     this.myGroup = new FormGroup({ firstName: new FormControl() });
     this.PromotionForm = new FormGroup({
            product_asin: new FormControl(''),
            product_title: new FormControl(''),
            product_price: new FormControl(''),
            discount_price: new FormControl('',Validators.required),
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