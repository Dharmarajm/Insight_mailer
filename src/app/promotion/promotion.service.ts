import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PromotionService {

  constructor(private http:HttpClient,public global:Global) { }

  getpromotion() {
        return this.http.get(this.global.apiUrl+'promotions');
    }


    edit_promotion(id) {
        return this.http.get(this.global.apiUrl+'promotions/'+id);
    }


    delete_promotion(id) {
      return this.http.delete(this.global.apiUrl+'promotions/'+id);
    }

    promotion_email_stat(id){
       return this.http.post(this.global.apiUrl+'promotions/promo_stats',{id: id});
    }

    getinventories(page) {
        return this.http.get(this.global.apiUrl+'inventories?page='+page);
    }

   getdata(id) {
        alert
        return this.http.get(this.global.apiUrl+'inventories/'+ id);
    }

    create_promotion(data,inventory_id,asi) {
        return this.http.post(this.global.apiUrl+'promotions', { promotion: data, id: inventory_id,asin:asi } );
    }

    edit_promotion_data(data,id){
       return this.http.put(this.global.apiUrl+'promotions/'+id, { promotion: data } );
    }

    promotion_enable(data) {
        return this.http.post(this.global.apiUrl+'promotions/enable',data);
    }

    inventory_search(search,page){
        return this.http.post(this.global.apiUrl+'inventories/search?search='+search,{page: page});
    }

}
