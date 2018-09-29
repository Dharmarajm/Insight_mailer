import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global';

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient,public global:Global) { }
  
  lastest_order() {
        return this.http.get(this.global.apiUrl+'dashboard/latest_order');
    }

    top_products() {
        return this.http.get(this.global.apiUrl+'dashboard/top_product');
    }

    all_top_products(interval) {
        return this.http.post(this.global.apiUrl+'dashboard/all_top_product',{days: interval});
    }

    order_stat(value) {
        return this.http.post(this.global.apiUrl+'dashboard/order_stats',{ value: value });
    }

    sentimentdata(value) {
        return this.http.post(this.global.apiUrl+'dashboard/sentiment_data',{ comment: value });
    }

    daily_order(value) {
        return this.http.post(this.global.apiUrl+'dashboard/day_order',{ date: value });
    }

     feedback_stat(value) {
        return this.http.post(this.global.apiUrl+'dashboard/feedback_stats',{ value: value });
    }

    count(){
        return this.http.get(this.global.apiUrl+'dashboard/product');
    }

    doughnut() {
        return this.http.get(this.global.apiUrl+'dashboard/doughnut_chart');
    }





    order() {
        return this.http.get(this.global.apiUrl+'dashboard/report');
    }

    top_customer() {
        return this.http.get(this.global.apiUrl+'dashboard/top_customer');
    }

    all_repeat_customers(interval) {
        return this.http.post(this.global.apiUrl+'dashboard/all_repeat_customer',{days: interval});
    }




    review() {
        return this.http.get(this.global.apiUrl+'dashboard/review');
    }

    last_sync() {
        return this.http.get(this.global.apiUrl+'dashboard/last_sync');
    }

    negative_feedback_mail(contant,review,subject) {
        return this.http.post(this.global.apiUrl+'emails/send_review_email',{ template: contant, email: review.email, subject: subject });
    }
    
    repeat_customer_mail(contant,subject,review) {
        return this.http.post(this.global.apiUrl+'emails/send_repeat_customer',{ template: contant, email: review, subject: subject });
    }

    geo_graph() {
        return this.http.get('http://192.168.1.79:4021/dashboard/pincode_data');
    }


}
