import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({Authorization: 'Bearer '+localStorage.getItem('prathip')})
};

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  lastest_order() {
        return this.http.get('http://192.168.1.64:3021/dashboard/latest_order',httpOptions);
    }

    top_products() {
        return this.http.get('http://192.168.1.64:3021/dashboard/top_product',httpOptions);
    }

    order_stat(value) {
        console.log(value);
        return this.http.post('http://192.168.1.64:3021/dashboard/order_stats',{ value: value },httpOptions);
    }

    count(){
        return this.http.get('http://192.168.1.64:3021/dashboard/product',httpOptions);
    }

    doughnut() {
        return this.http.get('http://192.168.1.64:3021/dashboard/doughnut_chart',httpOptions);
    }


}
