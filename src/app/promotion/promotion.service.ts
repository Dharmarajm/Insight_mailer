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
        return this.http.get('http://192.168.1.79:3021/promotions');
    }


    edit_promotion(id) {
        return this.http.get('http://192.168.1.79:3021/promotions/'+id);
    }


    delete_promotion(id) {
      return this.http.delete('http://192.168.1.79:3021/promotions/'+id);
    }

  getinventories() {
        return this.http.get('http://192.168.1.79:3021/inventories');
    }

   getdata(id) {
        alert
        return this.http.get('http://192.168.1.79:3021/inventories/'+ id);
    }

    create_promotion(data,inventory_id) {
        return this.http.post('http://192.168.1.79:3021/promotions', { promotion: data, id: inventory_id } );
    }

    edit_promotion_data(data,id){
       return this.http.put('http://192.168.1.79:3021/promotions/'+id, { promotion: data } );
    }

    promotion_enable(data) {
        return this.http.post('http://192.168.1.79:3021/promotions/enable',data);
    }

}
