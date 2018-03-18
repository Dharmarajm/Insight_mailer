import { Component, OnInit, Inject  } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppService } from './../app.service';
import { WindowService } from '../window.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2'

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
response:any;
hide: boolean = true;

 emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor( private LoginService:LoginService, private router:Router, private _window:WindowService,
  public nav:AppService,public dialog: MatDialog ) { }

  ngOnInit() {  
  }

 login(){
 this.data = {"auth":{"user_email": this.email,"password": this.password}}
  this.LoginService.userlogin(this.data).subscribe( res => {
  console.log(res);
  this.status = res;
  this.response = res;
   // this.utterance = new SpeechSynthesisUtterance('Hey You Have Succesfulli Logged In');
    //this.voices = window.speechSynthesis.getVoices();
    //  (<any>window).speechSynthesis.speak(this.utterance);
      //localStorage.setItem('prathip', this.response.id);
      localStorage.setItem('prathip', this.response.jwt );
       this.nav.show();
       this.LoginService.userstatus().subscribe( res => {
       if (res){
       this.router.navigate(['dashboard']);
       } else {
       this.router.navigate(['profile']);
       }
       })
   },
   error => {
   this.password = '';
    swal("Oops!", "Login Failed", "error") 
   }
   );
 }

 forget(){

     let dialogRef = this.dialog.open(PasswordChange, {
                    width: '500px'
                  });

                  dialogRef.afterClosed().subscribe(result => {
                    
                  });


  }

}

@Component({
  selector: 'password_change',
  templateUrl: 'password_change.html',
})
export class PasswordChange implements OnInit {

feedbacks: any;

  constructor(
    public dialogRef: MatDialogRef<PasswordChange>,
    @Inject(MAT_DIALOG_DATA) public data: any, private LoginService:LoginService) { }

    ngOnInit() {
     this.LoginService.forget_password("email").subscribe( res => {
       console.log(res);
      });
    }

}
