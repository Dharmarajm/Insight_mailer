import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  lastest_order() {
        return this.http.get('http://192.168.1.64:3021/dashboard/latest_order');
    }

    top_products() {
        return this.http.get('http://192.168.1.64:3021/dashboard/top_product');
    }

    order_stat(value) {
        console.log(value);
        return this.http.post('http://192.168.1.64:3021/dashboard/order_stats',{ value: value });
    }

    count(){
        return this.http.get('http://192.168.1.64:3021/dashboard/product');
    }

    doughnut() {
        return this.http.get('http://192.168.1.64:3021/dashboard/doughnut_chart');
    }


}
