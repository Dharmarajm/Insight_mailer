import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

 userlogin(data) {
        return this.http.post('http://192.168.1.79:3021/user_token',data);
    }
 
 userstatus() {
        return this.http.get('http://192.168.1.79:3021/users/acc_status');
    }

    forget_password(email) {
        return this.http.post('http://192.168.1.79:3021/users/forgot_password',{email: email});
    }
}
