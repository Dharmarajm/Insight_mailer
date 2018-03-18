import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  lastest_order() {
        return this.http.get('http://api.insightmailer.com/dashboard/latest_order');
    }

    top_products() {
        return this.http.get('http://api.insightmailer.com/dashboard/top_product');
    }

    order_stat(value) {
        console.log(value);
        return this.http.post('http://api.insightmailer.com/dashboard/order_stats',{ value: value });
    }

     feedback_stat(value) {
        console.log(value);
        return this.http.post('http://api.insightmailer.com/dashboard/feedback_stats',{ value: value });
    }

    count(){
        return this.http.get('http://api.insightmailer.com/dashboard/product');
    }

    doughnut() {
        return this.http.get('http://api.insightmailer.com/dashboard/doughnut_chart');
    }

    review() {
        return this.http.get('http://api.insightmailer.com/dashboard/review');
    }


}
