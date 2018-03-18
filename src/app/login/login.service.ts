import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

 userlogin(data) {
        return this.http.post('http://api.insightmailer.com/user_token',data);
    }
 
 userstatus() {
        return this.http.get('http://api.insightmailer.com/users/acc_status');
    }

    forget_password(email) {
        return this.http.post('http://api.insightmailer.com/users/forgot_password',{email: email});
    }
}
