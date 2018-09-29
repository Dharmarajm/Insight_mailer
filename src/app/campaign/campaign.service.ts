import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Global } from '../global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CampaignService {

  constructor(private http:HttpClient,public global:Global) { }

 getcampaigns() {
        return this.http.get(this.global.apiUrl+'campaigns');
    }
    

    edit_campaign(campaign_id){
     return this.http.get(this.global.apiUrl+'campaigns/'+ campaign_id);
    }

    


    delete_campaign(id) {
      return this.http.delete(this.global.apiUrl+'campaigns/'+id);
    }

    gettemplates() {
        return this.http.get(this.global.apiUrl+'templates');
    }

    getinventories(page) {
        return this.http.get(this.global.apiUrl+'inventories?page='+page);
    }

   campaign_create(id){
      return this.http.post(this.global.apiUrl+'campaigns/create',{campaign: {campagin_name: localStorage.getItem("campaign"),template_id: id}});
   }

   campaign_update(trigger_data){
      return this.http.post(this.global.apiUrl+'campaigns/trigger',{id: localStorage.getItem("campaign_id"),campaign: {id: localStorage.getItem("campaign_id"),triggers: trigger_data}});
   } 
    
    asin_push(asin_data) {
        return this.http.put(this.global.apiUrl+'campaigns/asin_push',{campaign_id: localStorage.getItem("campaign_id"),push: asin_data});
    }

    //sarath
    asin_bluk_push(asin_data) {
        return this.http.post(this.global.apiUrl+'campaigns/asin_array_push',{campaign_id: localStorage.getItem("campaign_id"),push: asin_data});
    }

     asin_enable_asins(camp_id){
        return this.http.get(this.global.apiUrl+'campaigns/enable_asin?id='+camp_id);
     }

     search_enable(search_val){
        return this.http.post(this.global.apiUrl+'campaigns/search_enable',{campaign_id: localStorage.getItem("campaign_id"),search: search_val});
     }


     //end
     asin_enable_push(asin_data) {
        return this.http.post(this.global.apiUrl+'campaigns/edit_push',{campaign_id: localStorage.getItem("campaign_id"),push: asin_data});
    }


    asin_remove(asin_data) {
        return this.http.put(this.global.apiUrl+'campaigns/asin_slice',{campaign_id: localStorage.getItem("campaign_id"),remove: asin_data});
    }

    bulk_asin_push(bulk_asin_data) {
        return this.http.put(this.global.apiUrl+'campaigns/bulk_asin_push',{campaign_id: localStorage.getItem("campaign_id"),push: bulk_asin_data});
    }

    enable_all() {
       return this.http.get(this.global.apiUrl+'campaigns/enable_all?id='+localStorage.getItem("campaign_id"));
    }

    disable_all() {
       return this.http.get(this.global.apiUrl+'campaigns/disable_all?id='+localStorage.getItem("campaign_id"));
    }

    enable_campaign(_id,status) {
        return this.http.put(this.global.apiUrl+'campaigns/cam_enable',{id: _id,enable: status});
    }

    name_uniq(name){
      return this.http.post(this.global.apiUrl+'campaigns/uniq_campaign',{campaign_name: name});
    }

    getemails(id,page) {
        return this.http.post(this.global.apiUrl+'campaigns/email_stats',{id: id,page:page});
    }

    template_update(campaign_id,ckeditorContent,index){
       return this.http.post(this.global.apiUrl+'campaigns/template_data_update',{campaign_id: campaign_id,content: ckeditorContent,index: index});
    }

    trigger_push(id){
      return this.http.post(this.global.apiUrl+'campaigns/trigger_push',{id: id});
    }

    trigger_remove(id,index){
      return this.http.post(this.global.apiUrl+'campaigns/trigger_remove',{id: id,index: index});
    }

    block_campaign(id,status){
      return this.http.post(this.global.apiUrl+'campaigns/enable_blacklist',{id: id,enable: status});
    }

    subject_update(id,subject,index){
       return this.http.post(this.global.apiUrl+'campaigns/subject_update',{id: id,subject: subject,index: index});
    }

    campaign_stat(id){
         return this.http.post(this.global.apiUrl+'campaigns/camp_stats/',{id: id});
    }

    inventory_search(search,page){
        return this.http.post(this.global.apiUrl+'inventories/search?search='+search,{page: page});
    }

    campaigndropdown(value){
        return this.http.post(this.global.apiUrl+'campaigns/camp_drop',value);
    }
   
}
