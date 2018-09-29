import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ChartsModule } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import {PopoverModule} from "ng2-popover";


//List Of Modules
import { AppComponent } from './app.component';
import { LoginComponent, PasswordChange } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent, CampaignTrigger } from './campaign/campaign.component';
import { CampaignNewComponent, EditTemplate, DetailTemplate, SelectTagNew } from './campaign-new/campaign-new.component';
import { CampaignEditComponent, EditTemplateEdit, SelectTag } from './campaign-edit/campaign-edit.component';
import { TriggerComponent } from './campaign/trigger.component';
import { PromotionComponent, SelectPromotion, CreatePromotion, TemplatePreview, SafeHtmlPipe } from './promotion/promotion.component';
import { PromotionEditComponent, EditSelectPromotion, EditPromotion, EditTemplatePreview } from './promotion-edit/promotion-edit.component';
import { DashboardComponent, Feedback, NegativeReviewMail, AllTopProducts, DailyOrders,RepeatCustomerMail, SentimentAnalysis,AllRepeatCustomers } from './dashboard/dashboard.component';
import { SharedComponent } from './shared/shared.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailStatusComponent, Preview } from './email-status/email-status.component';
import { PromotionEmailStatusComponent } from './promotion-email-status/promotion-email-status.component';

//List Of Service
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { InventoryService } from './inventory/inventory.service';
import { OrderService } from './order/order.service';
import { CampaignService } from './campaign/campaign.service';
import { PromotionService } from './promotion/promotion.service';
import { DashboardService } from './dashboard/dashboard.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { RefreshtokenInterceptor } from './shared/refreshtoken.interceptor';

import { Global } from './global';
import { AutofocusDirective } from './shared/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InventoryComponent,
    OrderComponent,
    CampaignComponent,
    CampaignTrigger,
    CampaignNewComponent,
    EditTemplate,
    DetailTemplate,
    SelectTagNew,
    CampaignEditComponent, 
    EditTemplateEdit,
    SelectTag,
    EditTemplatePreview,
    TriggerComponent,
    PromotionComponent,
    SelectPromotion, 
    CreatePromotion,
    PromotionEditComponent, 
    EditSelectPromotion,
    EditPromotion,
    DashboardComponent,
    Feedback,
    NegativeReviewMail,
    AllTopProducts,
    DailyOrders,
    SharedComponent,
    UserProfileComponent,
    TemplatePreview,
    EmailStatusComponent,
    PromotionEmailStatusComponent,
    Preview,
    PasswordChange,
    SafeHtmlPipe,
    AllRepeatCustomers,
    RepeatCustomerMail,
    SentimentAnalysis,
    AutofocusDirective
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
    NgbModule.forRoot(),
    NgxSpinnerModule,
    InfiniteScrollModule,
    Ng2OdometerModule.forRoot(),
    PopoverModule
  ],
  providers: [
                Global,
               AppService,
               LoginService,
               RegisterService,
               InventoryService,
               OrderService,
               CampaignService,
               PromotionService,
               UserProfileService,
               DashboardService,
               AuthGuardService,
               { provide: HTTP_INTERCEPTORS,
                 useClass: RefreshtokenInterceptor,
                 multi: true }
             ],
  entryComponents: [
                Feedback,
                NegativeReviewMail,
                AllTopProducts,
                AllRepeatCustomers,
                RepeatCustomerMail,
                DailyOrders,
                Preview,
                CampaignTrigger,
                SelectPromotion, 
                CreatePromotion,
                TemplatePreview,
                EditSelectPromotion, 
                EditPromotion, 
                EditTemplatePreview,
                EditTemplate,
                DetailTemplate,
                SelectTagNew,
                EditTemplateEdit,
                SelectTag,
                PasswordChange,
                SentimentAnalysis
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
