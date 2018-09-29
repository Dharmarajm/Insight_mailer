import { Component, OnInit } from '@angular/core';
import { PromotionService } from './../promotion/promotion.service';
import { AppService } from './../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-promotion-email-status',
  templateUrl: './promotion-email-status.component.html',
  styleUrls: ['./promotion-email-status.component.css']
})
export class PromotionEmailStatusComponent implements OnInit {

status: any;
promo_id: any;

  constructor(private PromotionService:PromotionService,private router: Router,public nav: AppService,private route: ActivatedRoute) { }

  ngOnInit() {
  this.nav.show();
    this.route.params.subscribe( params => this.promo_id = params.id);
   this.PromotionService.promotion_email_stat(this.promo_id).subscribe( res => {
     this.status = res[0];
   })
  }

}
