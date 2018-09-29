import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer, Address } from './trigger.interface';
import { CampaignService } from './../campaign/campaign.service';

@Component({
    moduleId: module.id,
    selector: 'trigger',
    templateUrl: 'trigger.component.html',
})
export class TriggerComponent implements OnInit {
 @Input('group')
    public adressForm: FormGroup;
    num: number;
    values: string[] = ["ordered","shipped","delivered","returned"];

    constructor(public campaign: CampaignService){

    }

     ngOnInit() {
     }

    onlyNumberKey(num){

      if(num > 30 || num < 0){
        alert("days should between 0 nd 30");
         (num > 30)? this.num = 30 : this.num = 0;
        }

    }

    promotion_template(){
     }

     triggerdropdown(value){
         console.log(value)
         this.campaign.campaigndropdown(value).subscribe((res){
            console.log(res);
         })
     }
   
}