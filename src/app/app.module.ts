import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';


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
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { TriggerComponent } from './campaign/trigger.component';
import { PromotionComponent, SelectPromotion, CreatePromotion, TemplatePreview } from './promotion/promotion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponent } from './shared/shared.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

//List Of Service
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { InventoryService } from './inventory/inventory.service';
import { OrderService } from './order/order.service';
import { CampaignService } from './campaign/campaign.service';
import { PromotionService } from './promotion/promotion.service';
import { DashboardService } from './dashboard/dashboard.service';
import { UserProfileService } from './user-profile/user-profile.service';


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
    CampaignNewComponent,
    TriggerComponent,
    PromotionComponent,
    SelectPromotion, 
    CreatePromotion,
    DashboardComponent,
    SharedComponent,
    UserProfileComponent,
    TemplatePreview
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
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
               LoginService,
               RegisterService,
               InventoryService,
               OrderService,
               CampaignService,
               PromotionService,
               UserProfileService,
               DashboardService
             ],
  entryComponents: [
                CampaignName,
                CampaignTemplate,
                CampaignAsin,
                CampaignTrigger,
                SelectPromotion, 
                CreatePromotion,
                TemplatePreview
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
