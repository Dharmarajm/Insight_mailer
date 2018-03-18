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
        return this.http.get('http://api.insightmailer.com/campaigns');
    }
    

    edit_campaign(campaign_id){
     return this.http.get('http://api.insightmailer.com/campaigns/'+ campaign_id);
    }


    delete_campaign(id) {
      return this.http.delete('http://api.insightmailer.com/campaigns/'+id);
    }

    gettemplates() {
        return this.http.get('http://api.insightmailer.com/templates');
    }

    getinventories() {
        return this.http.get('http://api.insightmailer.com/inventories');
    }

   campaign_create(id){
      return this.http.post('http://api.insightmailer.com/campaigns/create',{campaign: {campagin_name: localStorage.getItem("campaign"),template_id: id}});
   }

   campaign_update(trigger_data){
      return this.http.post('http://api.insightmailer.com/campaigns/trigger',{id: localStorage.getItem("campaign_id"),campaign: {id: localStorage.getItem("campaign_id"),triggers: trigger_data}});
   } 
    
    asin_push(asin_data) {
        return this.http.put('http://api.insightmailer.com/campaigns/asin_push',{campaign_id: localStorage.getItem("campaign_id"),push: asin_data});
    }

    asin_remove(asin_data) {
        return this.http.put('http://api.insightmailer.com/campaigns/asin_slice',{campaign_id: localStorage.getItem("campaign_id"),remove: asin_data});
    }
    enable_campaign(_id,status) {
        return this.http.put('http://api.insightmailer.com/campaigns/cam_enable',{id: _id,enable: status});
    }

    name_uniq(name){
      return this.http.post('http://api.insightmailer.com/campaigns/uniq_campaign',{name: name});
    }

    getemails(id) {
        return this.http.post('http://api.insightmailer.com/campaigns/email_stats',{id: id});
    }

    template_update(campaign_id,ckeditorContent,index){
       return this.http.post('http://api.insightmailer.com/campaigns/template_data_update',{campaign_id: campaign_id,content: ckeditorContent,index: index});
    }

}
