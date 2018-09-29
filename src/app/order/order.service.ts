import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

  constructor(private http:HttpClient,public global:Global) { }

  getorders(page) {
        return this.http.get(this.global.apiUrl+'orders?page='+page);
    }

  getsortorders(page,title,sort) {
        return this.http.get(this.global.apiUrl+'orders/order_sort?page='+page+'&title='+title+'&sort='+sort);
    }

  order_search(search,page){
        return this.http.post(this.global.apiUrl+'orders/search?search='+search,{page: page});
   }

    date_search(f_date,t_date){
        return this.http.get(this.global.apiUrl+'orders/date_period?from_date='+f_date +'&to_date='+t_date);
   }

}
