import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

  constructor(private http:HttpClient) { }

  getorders() {
        return this.http.get('http://192.168.1.64:3021/orders');
    }

}
