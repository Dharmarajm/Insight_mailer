import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegisterService {

  constructor(private http:HttpClient,public global:Global) { }

    register(registerdata) {
        return this.http.post(this.global.apiUrl+'users',registerdata);
    }

    email_uniq(email){
        return this.http.post(this.global.apiUrl+'users/uniq_email',{email: email});
    }

    phone_uniq(phone){
        return this.http.post(this.global.apiUrl+'users/uniq_phone',{phone: phone});
    }

}
