import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  constructor(private http:HttpClient,public global:Global) { }

 userlogin(data) {
        return this.http.post(this.global.apiUrl+'user_token',data);
    }
 
 userstatus() {
        return this.http.get(this.global.apiUrl+'users/acc_status');
    }

    forget_password(email) {
        return this.http.post(this.global.apiUrl+'users/forgot_password',{email: email});
    }
}
