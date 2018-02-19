import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

userprofiledata: any;

  constructor(private UserProfileService:UserProfileService, private router:Router) { }

  first_name = new FormControl('', [
  Validators.required
  ]);

  last_name = new FormControl('', [
  ]);

  email = new FormControl('', [
  Validators.required,
  Validators.email
  ]);

  old_password = new FormControl('',[
  Validators.required,
  Validators.minLength(6),
  Validators.pattern("[A-Z],+[@#\$&]*")
  ]);

  new_password = new FormControl('',[
  Validators.required,
  Validators.minLength(6),
  Validators.pattern("[A-Z],+[@#\$&]*")
  ]);

  confirm_password = new FormControl('',[
  Validators.required,
  Validators.minLength(6),
  Validators.pattern("[A-Z],+[@#\$&]*")
  ]);

  card_number = new FormControl('', [
  Validators.required
  ]);

  subscription_plan = new FormControl('', [
  Validators.required
  ]);

  merchant_id = new FormControl('', [
  Validators.required
  ]);

  marketplace = new FormControl('', [
  Validators.required
  ]);

  aws_accesskey_id = new FormControl('', [
  Validators.required
  ]);

  aws_secret_accesskey_id = new FormControl('', [
  Validators.required
  ]);


  ngOnInit() {
  }

  userprofile(){

  this.userprofiledata = {"first_name": this.first_name, "last_name": this.last_name,"email": this.email,"old_password": this.old_password, "new_password": this.new_password, "confirm_password": this.confirm_password, "card_number": this.card_number, "subscription_plan": this.subscription_plan,
  "merchant_id": this.merchant_id, "marketplace": this.marketplace, "aws_accesskey_id": this.aws_accesskey_id, "aws_secret_accesskey_id": this.aws_secret_accesskey_id}

  //this.UserProfileService.userprofile(this.userprofiledata).subscribe( res => {
         //alert(res);
  //});
  
}

}