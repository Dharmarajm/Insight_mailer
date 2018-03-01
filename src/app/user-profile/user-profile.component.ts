import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { Observable } from 'rxjs/Rx';
//import * as swal from 'sweetalert';
//import swal from 'sweetalert2'

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
//userprofile: any;
userprofiledata: any  

  constructor(private UserProfileService:UserProfileService, private router:Router, private _fb: FormBuilder) { }

public myForm: FormGroup;

  ngOnInit() {
  this.myForm = new FormGroup({
            first_name: new FormControl('',[Validators.required]),
            last_name: new FormControl(''),
            email: new FormControl('',[Validators.required,Validators.email]),
            old_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]),
            new_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]),
            confirm_password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]),
            card_number: new FormControl('',[Validators.required]),
            subscription_plan: new FormControl('',[Validators.required]),
            merchant_id: new FormControl('',[Validators.required]),
            marketplace_id: new FormControl('',[Validators.required]),
            aws_accesskey_id: new FormControl('',[Validators.required]),
            aws_secret_accesskey_id: new FormControl('',[Validators.required])
            //phone: new FormControl('',[Validators.required,Validators.minLength(10)])
        });
  }



  userprofile(){
  this.userprofiledata = {"first_name": this.first_name,"last_name": this.last_name,"email": this.email,"old_password": this.old_password,"new_password": this.new_password,"confirm_password": this.confirm_password, "card_number": this.card_number, "subscription_plan": this.subscription_plan, "merchant_id": this.merchant_id, "marketplace_id": this.marketplace_id, "aws_accesskey_id": this.aws_accesskey_id, "aws_secret_accesskey_id": this.aws_secret_accesskey_id}
    this.UserProfileService.userprofileregister(this.userprofiledata).subscribe( res => {
       // swal("Registered!", "You Have Sucessfully Registered", "success");
      //  this.router.navigate(['login']);
    });
   }

}


