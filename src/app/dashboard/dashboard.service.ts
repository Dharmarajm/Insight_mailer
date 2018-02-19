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


}
