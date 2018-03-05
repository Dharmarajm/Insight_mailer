import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegisterService {

  constructor(private http:HttpClient) { }

    register(registerdata) {
        return this.http.post('http://192.168.1.64:3021/users',registerdata);
    }

    email_uniq(email){
        return this.http.post('http://192.168.1.64:3021/users/uniq_email',{email: email});
    }

}
