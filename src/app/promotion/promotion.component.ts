import { Component, OnInit, Inject, Pipe, PipeTransform} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PromotionService } from './promotion.service';
import { AppService } from './../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import swal from 'sweetalert2'

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

date5: any;

page1: any;

dataSource = new MatTableDataSource;

  constructor(public dialog: MatDialog,private PromotionService:PromotionService, private router: Router,public nav: AppService) { }

  ngOnInit() {
  this.date5 = new FormControl(new Date());
  this.nav.show();
  this.PromotionService.getpromotion().subscribe( res => {
      this.promotions = res;
      this.dataSource = new MatTableDataSource(this.promotions);
    });
    this.min_date = new Date()
    //  this.showSelected = true;
  }

promotion_edit(id){
this.router.navigate(['promotion',id]);
 // this.PromotionService.edit_promotion(id).subscribe( res => {
  //  console.log(res);
  //  this.edit_data = res;
   // localStorage.setItem('edit_data', this.edit_data);
//let dialogRef1 = this.dialog.open(SelectPromotion, {
  //                  width: '1000px',
    //                disableClose: true
  //                });
//
    //              dialogRef1.afterClosed().subscribe(result1 => {
                    
                   // if(result1){
//let dialogRef2 = this.dialog.open(CreatePromotion, {
  //                  width: '1000px',
    //                disableClose: true,
      //              data: { id:  this.edit_data.inventory.id }
        //          });

          //        dialogRef2.afterClosed().subscribe(result2 => {
            //           //this.promotions.unshift(result2);
              //    });
//}
                //  });


    // });
}

promotion_delete(promotion_data,index){

swal({
  title: 'Are you sure?',
  text: 'You will not be able to recover this file!',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
  this.PromotionService.delete_promotion(promotion_data.id).subscribe( res => {
     this.promotions.splice(this.promotions.indexOf(promotion_data), 1);   
    });
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  } else if (result.dismiss === swal.DismissReason.cancel) {
    swal(
      'Cancelled',
      'Your file is safe :)',
      'error'
    )
  }
})

  
   
}

enable(event,id,inventory_id,date,from_date,to_date){
  //console.log(from_date.toDateString(),to_date.toISOString());
      //console.log(this.start_date[date].toDateString(),this.end_date[date].toDateString());   
    //  console.log(this.start_date[date],this.end_date[date]);   
  this.data = { id: id,inventory_id: inventory_id,enable: event.checked,from_date: from_date,to_date: to_date }
  this.PromotionService.promotion_enable(this.data).subscribe( res => {
      this.data_enable = res;
    });
}

promotion(){
}

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.promotions = this.dataSource.filteredData;
  }

promotion_preview(data){

let dialogRefprev = this.dialog.open(TemplatePreview, {
                    height: '800px',
                    width: '800px',
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
                      if(result2){
                       this.promotions.unshift(result2);
                       this.router.navigate(['promotion']);
                      }
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

dataSource = new MatTableDataSource;

  constructor(
    public dialogRef1: MatDialogRef<SelectPromotion>,private PromotionService:PromotionService) { } //,@Inject(MAT_DIALOG_DATA) public data: any

ngOnInit() {
  this.edit_data1 = localStorage.getItem('edit_data');
      this.PromotionService.getinventories().subscribe( res => {
      this.inventories = res;
      this.inventories = this.inventories.map(item => ({
      id: item.id,
  small_image: item.find_by_asin[0].small_image,
  asin: item.asin,
  sku: item.sku,
  title: item.find_by_asin[0].title,
  price_paisas: item.price_paisas,
  quantity: item.quantity,
  enable: item.enable
}));
this.dataSource = new MatTableDataSource(this.inventories);
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
    this.dialogRef1.close();
  }


//name
ok(): void {
     this.dialogRef1.close(this.id);
  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.inventories = this.dataSource.filteredData;
  }


}



@Component({
  selector: 'create_promotion',
  templateUrl: 'create_promotion.html',
})
export class CreatePromotion {

// data_types
product_asin: any;
product_title: any;
product_price: any;
discount_price: any;
product_description: any;
personal_msg: any;
promotion_title: any;
coupon_code: any;
support_email: any;
mail_frequency: any;


name: string;
edit_data1: any;
edit_data: any;

  data1:any;
  public PromotionForm: FormGroup;
  public myGroup: FormGroup;


  constructor(
    public dialogRef2: MatDialogRef<CreatePromotion>,private PromotionService:PromotionService,@Inject(MAT_DIALOG_DATA) public data: any, private router:Router) { } //,@Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    //alert("sure");
  }

  promotion(myPromotionForm){
   this.PromotionService.create_promotion(myPromotionForm,this.data.id).subscribe( res => {
      this.dialogRef2.close(res);
    });

  }

  cancel(){
   swal('Deleted!','Your Promotion is not created.','success')
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
            support_email: new FormControl('',[Validators.required,Validators.email]),
            mail_frequency: new FormControl('',Validators.required)
         });

         //product_category: new FormControl(''),
         //product_description: new FormControl(''),
  }

ok(name): void {
   this.router.navigate(['promotion']);
     this.dialogRef2.close();

  }

  discount(){
     if(this.discount_price >= (this.data1.price_cents/100)){
          alert("promotion price should be less than actual price");
          this.discount_price= '';
     }
  }

}


@Component({
  selector: 'template_preview',
  templateUrl: 'template_preview.html',
  styleUrls: ['./promotion.component.css']
})
export class TemplatePreview {

promotion_template: SafeHtml;

  constructor(
    public dialogRefprev: MatDialogRef<TemplatePreview>,private sanitizer: DomSanitizer,@Inject(MAT_DIALOG_DATA) public data: any) { 
   this.promotion_template = this.data.data;
    }


ok(): void {
     this.dialogRefprev.close();
  }


}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
