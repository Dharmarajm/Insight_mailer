import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { AppService } from './../app.service';
import { Observable } from 'rxjs/Rx';
import swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import {Location} from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




declare var Razorpay: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  first_name: string;
  last_name: string;
  email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
  card_number: string;
  subscription_plan: string;
  merchant_id: any;
  marketplace_id: string;
  aws_accesskey_id: string;
  aws_secret_accesskey_id: string;
  mws_auth_token: string;
  //userprofile: any;
  userprofiledata: any;
  hide1: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;
  hide4: boolean = true;

  res_data: any;
 // values: any[] = ['Monthly', 'BI Annual', 'Annual'];
  values: any[] = [1,2,3,4,5,6,7,8,9,10]
  durations: any[] = ['1Month', '3Months', '6Months', '12Months'];
  totalamount: number;
  package_details: any;
  plan_name: any;
  pay_details: any;
  pay_res: any;
  loadingProgress: boolean = false;
  success_image: string;
  public pay_status:any;
  billdetail:any;
  package:any = {};
  packageValue:any;
  packagesize:any;
  packagetotalamount:any;
  planName:any;
  constructor(private UserProfileService: UserProfileService, private router: Router, private _fb: FormBuilder, public nav: AppService, private spinner: NgxSpinnerService,private location: Location,public dialog: MatDialog) { }

  public myForm: FormGroup;
  public myForm1: FormGroup;
  public myForm2: FormGroup;
  public myForm3: FormGroup;
  public myFormrecharge: FormGroup;

  ngOnInit() {

    //Observable.interval(2000).subscribe(x => {
     // this.location.back();
    //});

     
    
    this.nav.show();
    this.UserProfileService.user_data().subscribe(res => {
      this.res_data = res;
      this.first_name = this.res_data.firstname;
      this.last_name  = this.res_data.lastname;
      this.email      = this.res_data.user_email;
    })

    this.UserProfileService.addonpackage().subscribe(res => {
      this.package = res;
      console.log(this.package);
    })

     this.UserProfileService.planName().subscribe(res => {
      this.planName = res;
      console.log(this.planName);
    })

    

    this.myForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])

    });

    this.myForm3 = new FormGroup({
      old_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });


    this.myForm1 = new FormGroup({
      card_number: new FormControl(''),
      subscription_plan: new FormControl('Beta Customer'),
      totalamount: new FormControl('')
    });

    

    this.myForm2 = new FormGroup({
      merchant_id: new FormControl('', [Validators.required]),
      marketplace_id: new FormControl('', [Validators.required]),
      mws_auth_token: new FormControl('', [Validators.required])
    });

    this.myFormrecharge = new FormGroup({
      package: new FormControl(''),
      packagesize: new FormControl(''),
      packagetotalamount: new FormControl('')
    });
    //this.billingDetails();


  }

  billingDetails(){
    
    this.UserProfileService.billdetails().subscribe(res => {
      console.log(res);
      this.billdetail=res;
   
    });
  }

  pay() {

    if(this.totalamount == null){
      swal("Failed!", "Please fill all datas", "info");
      return;
    }
    let payment_data = { data: this.pay_details };
    // let payment_data={plan_name:this.package_details}
    this.UserProfileService.payment(payment_data).subscribe(res => {
      console.log(res);
      this.payNow(res);
    });
  }
  payNow(pay_res) {


    var options = {
      "key": "rzp_test_ydtRyDzgm8qfQm",
      "amount": this.totalamount * 100, // 2000 paise = INR 20
      "name": "Insight Mailer",
      "description": "Monthly Payment",

      "handler": this.paymentCapture.bind(this),
      "prefill": {
        "name": "",
        "email": pay_res.user_email,
        "contact": pay_res.phone,

      },
      "notes": {},
      "theme": {
        "color": "#1fbba7"
      }
    };
    var rzp1 = new Razorpay(options);

    rzp1.open();

    // body...
  }
 

  paymentCapture(response) {
    //  this.paymentId = response.razorpay_payment_id;
    this.UserProfileService.razorpay(response).subscribe(res => {
      console.log(res);
     //  window.location.href = "https://api.razorpay.com/v1/payments/"+ response.razorpay_payment_id+"/callback/8d59c42b4e80a550e8b63fd50a2060593ea6da76/rzp_test_IeYgScfVGKnASR";
     let status=res;
    // localStorage.setItem("paydetail",JSON.stringify(status));
     this.pay_status=res;
     if(this.pay_status.status == "authorized"){ 
      
     swal("Success!", "Payment Sucessfully", "success");
     this.UserProfileService.billdetails().subscribe(res => {
      console.log(res);
      this.billdetail =this.billdetail.map(res);
  
    });
    }else{
      swal("Failed!", "Payment Failed ", "info");
    }
    })
    //TODO
  }

  save_ok(): void {
    //localStorage.setItem("user-profile",save);
    // this.dialogRef1.close(name);
  }

  subscriChange(val) {
    console.log(val.value);
    this.plan_name = val.value;
    let changeData = { "value": val.value };
    this.UserProfileService.subscript(changeData).subscribe(res => {
      /*if(res){ 
         swal("Updated!", "You Have Sucessfully Updated", "success");
         }*/
      this.package_details = res;
      console.log(this.package_details);
    });
  }




  durationChange(data) {
    console.log(data.value);
    this.pay_details = data.value;
    this.totalamount = data.value.plan_price;

  }

 

  packageChange(value){
    console.log(value);
    this.packageValue = value.value;

  }

   noofpackChange(value){
     this.packagesize=value.value;
     if(this.packageValue ==null){
        alert("Please select package");
        return;
     }
     let data={pack:this.packageValue,packsize:this.packagesize};
      this.UserProfileService.packCalc(data).subscribe(res => {
    console.log(res);
    this.packagetotalamount= res[0].amount;
    });
 
  }

   packagePay(){

   console.log(this.packagesize,this.packageValue);
  }

  userprofile() {
    this.userprofiledata = { "first_name": this.first_name, "last_name": this.last_name, "email": this.email }
    this.UserProfileService.userprofileregister(this.userprofiledata).subscribe(res => {
      if (res) {
        swal("Updated!", "You Have Sucessfully Updated your Account", "success");
      }
      //  this.router.navigate(['login']);
    });
  }

  passwordchange() {
    this.userprofiledata = { "old_password": this.old_password, "new_password": this.new_password }
    this.UserProfileService.userprofilepasswordchange(this.userprofiledata).subscribe(res => {
      if (res) {
        swal("Updated!", "your password changed", "success");
      }
    });
  }

  accdetail() {
    this.userprofiledata = { "card_number": this.card_number, "subscription_plan": this.subscription_plan }
    this.UserProfileService.userprofileaccdetail(this.userprofiledata).subscribe(res => {
      if (res) {
        swal("Updated!", "You Have Sucessfully Updated Your Account", "success");
      }
    });
  }


  credential() {
    this.userprofiledata = { "merchant_id": this.merchant_id, "marketplace_id": this.marketplace_id, "mws_auth_token": this.mws_auth_token }
    this.UserProfileService.userprofilecredential(this.userprofiledata).subscribe(res => {
      if (res) {
        this.spinner.show();
        this.UserProfileService.sync().subscribe(res => {
          this.spinner.hide();
          swal("Linked!", "You Have Sucessfully Linked Your account", "success");
        },
          error => {
            this.spinner.hide();
            swal("In Process", "Your Account Sync is in Progress Contact Admin for further details", "info")
          }
        )
      }
    });
  }


  merchantChange(){
    this.merchant_id=this.merchant_id.trim().replace(" ","");
  }

   marketplaceChange(){
    this.marketplace_id=this.marketplace_id.trim().replace(" ","");
  }

  mwsChange(){
    this.mws_auth_token=this.mws_auth_token.trim().replace(" ","");
  }
}


