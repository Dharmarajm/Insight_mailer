import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignService {

  constructor(private http:HttpClient) { }

 getcampaigns() {
        return this.http.get('http://192.168.1.64:3021/campaignes');
    }

    gettemplates() {
        return this.http.get('http://192.168.1.64:3021/templates');
    }

    getinventories() {
        return this.http.get('http://192.168.1.64:3021/inventories');
    }

}
