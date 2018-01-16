import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { RegisterService } from './register.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

first_name: string;
last_name: string;
email: string;
password: string;
phone: number;
registerdata:any;

  constructor(private RegisterService:RegisterService) { }

firstnameFormControl = new FormControl('', [
    Validators.required
  ]);

lastnameFormControl = new FormControl('', [
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  register(){
  this.registerdata = {"first_name": this.first_name,"last_name": this.last_name,"user_email": this.email,"password": this.password,"phone": this.phone}
    this.RegisterService.register(this.registerdata).subscribe( res => {
        alert(res);
    });
   }

}
