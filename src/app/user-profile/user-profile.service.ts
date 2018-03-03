import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserProfileService {

  constructor(private http:HttpClient) { }

userprofileregister(userprofiledata) {
        return this.http.post('http://192.168.1.64:3021/users/user_profile',userprofiledata);
    }

}