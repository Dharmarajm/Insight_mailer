import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  lastest_order() {
        return this.http.get('http://192.168.1.79:3021/dashboard/latest_order');
    }

    top_products() {
        return this.http.get('http://192.168.1.79:3021/dashboard/top_product');
    }

    all_top_products() {
        return this.http.get('http://192.168.1.79:3021/dashboard/all_top_product');
    }

    order_stat(value) {
        return this.http.post('http://192.168.1.79:3021/dashboard/order_stats',{ value: value });
    }

    daily_order(value) {
        return this.http.post('http://192.168.1.79:3021/dashboard/day_order',{ date: value });
    }

     feedback_stat(value) {
        console.log(value);
        return this.http.post('http://192.168.1.79:3021/dashboard/feedback_stats',{ value: value });
    }

    count(){
        return this.http.get('http://192.168.1.79:3021/dashboard/product');
    }

    doughnut() {
        return this.http.get('http://192.168.1.79:3021/dashboard/doughnut_chart');
    }

    review() {
        return this.http.get('http://192.168.1.79:3021/dashboard/review');
    }

    negative_feedback_mail(contant,review,subject) {
        return this.http.post('http://192.168.1.79:3021/emails/send_review_email',{ template: contant, email: review.email, subject: subject });
    }


}
