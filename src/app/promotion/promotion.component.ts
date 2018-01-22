import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PromotionService } from './promotion.service';

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

promote(){

 let dialogRef1 = this.dialog.open(SelectPromotion, {
                    width: '1000px'
                  });

                  dialogRef1.afterClosed().subscribe(result => {
                    alert("result");
let dialogRef2 = this.dialog.open(CreatePromotion, {
                    width: '1000px'
                  });

                  dialogRef2.afterClosed().subscribe(result => {
                    alert("result");
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

  constructor(
    public dialogRef1: MatDialogRef<SelectPromotion>,private PromotionService:PromotionService) { } //,@Inject(MAT_DIALOG_DATA) public data: any

ngOnInit() {
      this.PromotionService.getinventories().subscribe( res => {
      this.inventories = res;
    });
  }


  onNoClick(): void {
    alert("sure");
  }

ok(name): void {
     this.dialogRef1.close();
  }


}



@Component({
  selector: 'create_promotion',
  templateUrl: 'create_promotion.html',
})
export class CreatePromotion {

name: string;

  constructor(
    public dialogRef2: MatDialogRef<CreatePromotion>,private promotion_service:PromotionService) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    alert("sure");
  }

ok(name): void {
     this.dialogRef2.close();
  }


}