import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Observable } from 'rxjs/Observable';
//import * as swal from 'sweetalert';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

first_name: any;
last_name: any;
email: any;
password: any;
phone: any;
registerdata: any;
hide: boolean = true;

status: any; 

  constructor(private RegisterService:RegisterService, private router:Router, private _fb: FormBuilder) { }

public myForm: FormGroup;

  ngOnInit() {
  this.myForm = new FormGroup({
            first_name: new FormControl('',[Validators.required]),
            last_name: new FormControl(''),
            email: new FormControl('',[Validators.required,Validators.email]),
            password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern("((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,})")]), 
            phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
        });
  }



  register(){
  this.registerdata = {"first_name": this.first_name,"last_name": this.last_name,"user_email": this.email,"password": this.password,"phone": this.phone}
    this.RegisterService.register(this.registerdata).subscribe( res => {
      this.status = res;
         if(this.status){
        swal("Registered!", "You Have Sucessfully Registered", "success");
        this.router.navigate(['login']);
        }else{
          swal("Not Registered!", "Registration Failed" , "error");
        }
    },
    error => { console.log(error); }
    );
   }

   email_uniq(email){
      this.RegisterService.email_uniq(email).subscribe( res => {
      if(res){
        swal('Oops...', 'Email Already in Use!', 'warning')
        this.email = '';
        }
  });
 }

  phone_uniq(phone){
      this.RegisterService.phone_uniq(phone).subscribe( res => {
      if(res){
        swal('Oops...', 'Number Already in Use!', 'warning')
        this.phone = '';
        }
  });
 }

}
