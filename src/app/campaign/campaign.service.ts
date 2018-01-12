import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignService {

  constructor(private http:HttpClient) { }

 getcampaigns() {
        return this.http.get('http://192.168.1.64:3021/campaignes');
    }

    gettemplates() {
        return this.http.get('http://192.168.1.64:3021/templates');
    }

    getinventories() {
        return this.http.get('http://192.168.1.64:3021/inventories');
    }

   campaign_create(id){
      return this.http.post('http://192.168.1.64:3021/campaigns/create',{campaign: {campagin_name: localStorage.getItem("campaign"),user_id: 1,template_id: id}});
   }

   campaign_update(trigger_data){
      return this.http.put('http://192.168.1.64:3021/campaigns/'+localStorage.getItem("campaign_id"),{campaign: {triggers: trigger_data}});
   }
    

    asin_push(asin_data) {
        return this.http.put('http://192.168.1.64:3021/campaigns/asin_push',{campaign_id: localStorage.getItem("campaign_id"),push: asin_data});
    }

    asin_remove(asin_data) {
        return this.http.put('http://192.168.1.64:3021/campaigns/asin_slice',{campaign_id: localStorage.getItem("campaign_id"),remove: asin_data});
    }

}
