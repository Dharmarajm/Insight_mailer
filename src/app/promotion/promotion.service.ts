import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PromotionService {

  constructor(private http:HttpClient) { }

  getpromotion() {
        return this.http.get('http://192.168.1.64:3021/promotions');
    }

  getinventories() {
        return this.http.get('http://192.168.1.64:3021/inventories');
    }

   getdata(id) {
        return this.http.get('http://192.168.1.64:3021/inventories/'+ id);
    }

    create_promotion(data) {
        return this.http.post('http://192.168.1.64:3021/promotions',{promotion: data});
    }

}
