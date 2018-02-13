import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ChartsModule } from 'ng2-charts';

//List Of Modules
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent, CampaignName, CampaignTemplate, CampaignAsin, CampaignTrigger } from './campaign/campaign.component';
import { TriggerComponent } from './campaign/trigger.component';
import { PromotionComponent, SelectPromotion, CreatePromotion } from './promotion/promotion.component';

//List Of Service
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { InventoryService } from './inventory/inventory.service';
import { OrderService } from './order/order.service';
import { CampaignService } from './campaign/campaign.service';
import { PromotionService } from './promotion/promotion.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InventoryComponent,
    OrderComponent,
    CampaignComponent,
    CampaignName,
    CampaignTemplate,
    CampaignAsin,
    CampaignTrigger,
    TriggerComponent,
    PromotionComponent,
    SelectPromotion, 
    CreatePromotion
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule,
    NgxPaginationModule,
    ChartsModule,
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [
               LoginService,
               RegisterService,
               InventoryService,
               OrderService,
               CampaignService,
               PromotionService
             ],
  entryComponents: [
                CampaignName,
                CampaignTemplate,
                CampaignAsin,
                CampaignTrigger,
                SelectPromotion, 
                CreatePromotion
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
