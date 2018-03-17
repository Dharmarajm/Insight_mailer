import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { AppService } from './../app.service';
import { Observable } from 'rxjs/Rx';
//import * as swal from 'sweetalert';
import swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

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
merchant_id: string;
marketplace_id: string;
aws_accesskey_id: string;
aws_secret_accesskey_id: string;
mws_auth_token: string;
//userprofile: any;
userprofiledata: any 
hide1: boolean = true; 
hide2: boolean = true;
hide3: boolean = true;
hide4: boolean = true;

res_data: any;

  constructor(private UserProfileService:UserProfileService, private router:Router, private _fb: FormBuilder,public nav: AppService,private spinner: NgxSpinnerService) { }

public myForm: FormGroup;
public myForm1: FormGroup;
public myForm2: FormGroup;

  ngOnInit() {
  this.nav.show();
 this.UserProfileService.user_data().subscribe( res => {
  this.res_data = res;
  console.log(this.res_data);
 })

  this.myForm = new FormGroup({
            first_name: new FormControl('',[Validators.required]),
            last_name: new FormControl(''),
            email: new FormControl('',[Validators.required,Validators.email]),
            old_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,})")]),
            new_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,})")]),
            confirm_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,})")])
        });
  

  this.myForm1 = new FormGroup({
            card_number: new FormControl(''),
            subscription_plan: new FormControl('Beta Customer')
  });


  this.myForm2 = new FormGroup({
            merchant_id: new FormControl('',[Validators.required]),
            marketplace_id: new FormControl('',[Validators.required]),
            mws_auth_token: new FormControl('',[Validators.required])
  });
}


            //aws_accesskey_id: new FormControl('',[Validators.required]),
            //aws_secret_accesskey_id: new FormControl('',[Validators.required])
            //card_number: new FormControl(''),
            //subscription_plan: new FormControl('Beta Customer',[Validators.required]),
            //merchant_id: new FormControl('',[Validators.required]),
            //marketplace_id: new FormControl('',[Validators.required]),
            //aws_accesskey_id: new FormControl('',[Validators.required]),
            //aws_secret_accesskey_id: new FormControl('',[Validators.required])
            //phone: new FormControl('',[Validators.required,Validators.minLength(10)])


   save_ok(): void {
//localStorage.setItem("user-profile",save);
    // this.dialogRef1.close(name);
  }



  userprofile(){
  this.userprofiledata = {"first_name": this.first_name,"last_name": this.last_name,"email": this.email,"old_password": this.old_password,"new_password": this.new_password,"confirm_password": this.confirm_password}
    this.UserProfileService.userprofileregister(this.userprofiledata).subscribe( res => {
       if(res){ 
       swal("Updated!", "You Have Sucessfully Updated your Account", "success");
       }
      //  this.router.navigate(['login']);
    });
   }
  
  accdetail(){
   this.userprofiledata = {"card_number": this.card_number, "subscription_plan": this.subscription_plan}
   this.UserProfileService.userprofileaccdetail(this.userprofiledata).subscribe(res => {
    if(res){ 
       swal("Updated!", "You Have Sucessfully Updated Your Account", "success");
       }
   });
  }


  credential(){
   this.userprofiledata = {"merchant_id": this.merchant_id, "marketplace_id": this.marketplace_id, "mws_auth_token": this.mws_auth_token}
   this.UserProfileService.userprofilecredential(this.userprofiledata).subscribe( res => {
   if(res){ 
   this.spinner.show();
       this.UserProfileService.sync().subscribe( res => {
       this.spinner.hide();
       console.log(res);
       swal("Linked!", "You Have Sucessfully Linked Your account", "success");
           })
       }
   });
  }
}


