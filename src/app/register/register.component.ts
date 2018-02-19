import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Observable } from 'rxjs/Rx';
//import * as swal from 'sweetalert';
import swal from 'sweetalert2'

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

  constructor(private RegisterService:RegisterService, private router:Router, private _fb: FormBuilder) { }

public myForm: FormGroup;

  ngOnInit() {
  this.myForm = new FormGroup({
            first_name: new FormControl('',[Validators.required]),
            last_name: new FormControl(''),
            email: new FormControl('',[Validators.required,Validators.email]),
            password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{4,20}/),
            phone: new FormControl('',[Validators.required,Validators.minLength(6)])
        });
  }



  register(){
  this.registerdata = {"first_name": this.first_name,"last_name": this.last_name,"user_email": this.email,"password": this.password,"phone": this.phone}
    this.RegisterService.register(this.registerdata).subscribe( res => {
        swal("Registered!", "You Have Sucessfully Registered", "success");
        this.router.navigate(['login']);
    });
   }

}
