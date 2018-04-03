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
        return this.http.get('http://192.168.1.79:3021//inventories');
    }

    enable(event,asin){
        return this.http.post('http://192.168.1.79:3021//inventories/enable',{asin: asin, enable: event});
    }

}