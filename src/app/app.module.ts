import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ChartsModule } from 'ng2-charts';


//List Of Modules
import { AppComponent } from './app.component';
import { LoginComponent, PasswordChange } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent, CampaignName, CampaignTemplate, CampaignAsin, CampaignTrigger } from './campaign/campaign.component';
import { CampaignNewComponent, EditTemplate, DetailTemplate } from './campaign-new/campaign-new.component';
import { CampaignEditComponent, EditTemplateEdit } from './campaign-edit/campaign-edit.component';
import { TriggerComponent } from './campaign/trigger.component';
import { PromotionComponent, SelectPromotion, CreatePromotion, TemplatePreview, SafeHtmlPipe } from './promotion/promotion.component';
import { PromotionEditComponent, EditSelectPromotion, EditPromotion, EditTemplatePreview } from './promotion-edit/promotion-edit.component';
import { DashboardComponent, Feedback, NegativeReviewMail } from './dashboard/dashboard.component';
import { SharedComponent } from './shared/shared.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailStatusComponent, Preview } from './email-status/email-status.component';

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
    EditTemplate,
    DetailTemplate,
    CampaignEditComponent, 
    EditTemplateEdit,
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
    SharedComponent,
    UserProfileComponent,
    TemplatePreview,
    EmailStatusComponent,
    Preview,
    PasswordChange,
    SafeHtmlPipe
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
    NgxSpinnerModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [
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
                Preview,
                CampaignName,
                CampaignTemplate,
                CampaignAsin,
                CampaignTrigger,
                SelectPromotion, 
                CreatePromotion,
                TemplatePreview,
                EditSelectPromotion, 
                EditPromotion, 
                EditTemplatePreview,
                EditTemplate,
                DetailTemplate,
                EditTemplateEdit,
                PasswordChange
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
