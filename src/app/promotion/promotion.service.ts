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
        return this.http.get('http://api.insightmailer.com/promotions');
    }


    edit_promotion(id) {
        return this.http.get('http://api.insightmailer.com/promotions/'+id);
    }


    delete_promotion(id) {
      return this.http.delete('http://api.insightmailer.com/promotions/'+id);
    }

  getinventories() {
        return this.http.get('http://api.insightmailer.com/inventories');
    }

   getdata(id) {
        alert
        return this.http.get('http://api.insightmailer.com/inventories/'+ id);
    }

    create_promotion(data,inventory_id) {
        return this.http.post('http://api.insightmailer.com/promotions', { promotion: data, id: inventory_id } );
    }

    edit_promotion_data(data,id){
       return this.http.put('http://api.insightmailer.com/promotions/'+id, { promotion: data } );
    }

    promotion_enable(data) {
        return this.http.post('http://api.insightmailer.com/promotions/enable',data);
    }

}
