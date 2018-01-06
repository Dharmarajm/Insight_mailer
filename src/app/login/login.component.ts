import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [WindowService]
})
export class LoginComponent implements OnInit {

user:any;
email:any;
password:any;
data:any;
status:any;
utterance:any;
voices:any;

 emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor( private LoginService:LoginService, private router:Router, private _window:WindowService ) { }

  ngOnInit() {
  
  }

 login(){
 this.data = {"auth":{"user_email": this.email,"password": this.password}}
  this.LoginService.userlogin(this.data).subscribe( res => {
  this.status = res;
    if(this.status.jwt){
    this.utterance = new SpeechSynthesisUtterance('Hey You Have Succesfulli Logged In');
    //this.voices = window.speechSynthesis.getVoices();
      (<any>window).speechSynthesis.speak(this.utterance);
       this.router.navigate(['inventory']);
    } else {
      alert("Login Failed");
    }

   });
 }

}
