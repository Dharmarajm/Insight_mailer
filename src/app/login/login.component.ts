import { Component, OnInit, Inject  } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppService } from './../app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user:any;
email:any;
password:any;
data:any;
status:any;
response:any;
hide: boolean = true;
userdata:any={};

 emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor( private LoginService:LoginService, private router:Router,
  public nav:AppService,public dialog: MatDialog, public appComp:AppComponent ) { }

  ngOnInit() {  
    this.nav.hide();
     
  }
  emailChange(){
  
   this.email= this.email.toLowerCase().trim();
   this.email=this.email.replace(" ","");
  }

 login(){
 this.data = {"auth":{"user_email": this.email,"password": this.password}}
  this.LoginService.userlogin(this.data).subscribe( res => {
  this.status = res;
  this.response = res;
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

       this.nav.user_data().subscribe(res => {
    this.userdata = res;
    if(this.userdata.lastname == null){
      this.userdata.lastname ="";
    }
  this.appComp.name=this.userdata.firstname + ' ' + this.userdata.lastname;
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
                    width: '500px',
                    position: {top: '10%',left:'28%'}
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
email:any;
feedbacks: any;
emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public dialogRef: MatDialogRef<PasswordChange>,
    @Inject(MAT_DIALOG_DATA) public data: any, private LoginService:LoginService) { }

    ngOnInit() {
     
    }

    emailChange(){
  
  // this.email= this.email.toLowerCase().trim();
   this.email=this.email.trim().replace(" ","");
  }
  ForgetSubmit(){

    if(this.email == null){
      return;
    }
   
 this.LoginService.forget_password(this.email).subscribe( res => {
   if(res == null){
    swal("Oops!", "Invalid Email", "error") 
    }else{
      swal("Password!", "New password send your registered Email", "success");
   }
    this.dialogRef.close();
      });

  }


}


