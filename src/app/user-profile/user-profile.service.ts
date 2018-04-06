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
        return this.http.post('http://192.168.1.79:3021/users/user_profile',userprofiledata);
    }

     userprofilepasswordchange(userprofiledata){
        return this.http.post('http://192.168.1.79:3021/users/change_password',userprofiledata);
    }
    
    userprofilecredential(userprofiledata){
        return this.http.post('http://192.168.1.79:3021/users/credential',userprofiledata);
    }

    userprofileaccdetail(userprofiledata){
        return this.http.post('http://192.168.1.79:3021/users/accdetail',userprofiledata);
    }

    sync(){
        return this.http.get('http://192.168.1.79:3021/dashboard/sync');
    }

    user_data(){
        return this.http.get('http://192.168.1.79:3021/users/user_data');
    }

}