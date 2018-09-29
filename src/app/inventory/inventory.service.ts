import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Global } from '../global';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InventoryService {

  constructor(private http:HttpClient,public global:Global) { }

  getinventories(page) {
        return this.http.get(this.global.apiUrl+'inventories?page='+page);
    }

    enable(event,asin){
        return this.http.post(this.global.apiUrl+'inventories/enable',{asin: asin, enable: event});
    }

     inventory_search(search,page){
        return this.http.post(this.global.apiUrl+'inventories/search?search='+search,{page: page});
    }

}