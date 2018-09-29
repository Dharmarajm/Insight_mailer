import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserProfileService { 

  constructor(private http:HttpClient,public global:Global) { }

    userprofileregister(userprofiledata) {
        return this.http.post(this.global.apiUrl+'users/user_profile',userprofiledata);
    }

     userprofilepasswordchange(userprofiledata){
        return this.http.post(this.global.apiUrl+'users/change_password',userprofiledata);
    }
    
    userprofilecredential(userprofiledata){
        return this.http.post(this.global.apiUrl+'users/credential',userprofiledata);
    }

    userprofileaccdetail(userprofiledata){
        return this.http.post(this.global.apiUrl+'users/accdetail',userprofiledata);
    }

    sync(){
        return this.http.get(this.global.apiUrl+'dashboard/sync');
    }

    subscript(value){
   
        return this.http.post(this.global.apiUrl+'users/subscript',value);
    }

    payment(data){
   
        return this.http.post(this.global.apiUrl+'users/payment',data);
    }

    razorpay(value){
        return this.http.post(this.global.apiUrl+'users/razorpay_detail',value)
    }

     billdetails(){
        return this.http.get(this.global.apiUrl+'users/next_billing_date');
     }
   

    user_data(){
        return this.http.get(this.global.apiUrl+'users/user_data');
    }

    addonpackage(){
        return this.http.get(this.global.apiUrl+'users/add_on');
    }

    planName(){
        return this.http.get(this.global.apiUrl+'users/plan_name');
    }

    packCalc(data){
        return this.http.post(this.global.apiUrl+'users/addon_cal',data);
    }

}