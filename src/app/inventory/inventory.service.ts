import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InventoryService {

  constructor(private http:HttpClient) { }

  getinventories() {
        return this.http.get('api.insightmailer.com/inventories');
    }

    enable(event,asin){
        return this.http.post('api.insightmailer.com/inventories/enable',{asin: asin, enable: event});
    }

}