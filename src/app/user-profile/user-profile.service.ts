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
        return this.http.post('api.insightmailer.com/users/user_profile',userprofiledata);
    }

    userprofilecredential(userprofiledata){
        return this.http.post('api.insightmailer.com/users/credential',userprofiledata);
    }

    userprofileaccdetail(userprofiledata){
        return this.http.post('api.insightmailer.com/users/accdetail',userprofiledata);
    }

    sync(){
        return this.http.get('api.insightmailer.com/dashboard/sync');
    }

    user_data(){
        return this.http.get('api.insightmailer.com/users/user_data');
    }

}