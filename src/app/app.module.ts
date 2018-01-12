import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CKEditorModule } from 'ng2-ckeditor';

//List Of Modules
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent, CampaignName, CampaignTemplate, CampaignAsin, CampaignTrigger } from './campaign/campaign.component';
import { TriggerComponent } from './campaign/trigger.component';

//List Of Service
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { InventoryService } from './inventory/inventory.service';
import { OrderService } from './order/order.service';
import { CampaignService } from './campaign/campaign.service';


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
    TriggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule
  ],
  providers: [
               LoginService,
               RegisterService,
               InventoryService,
               OrderService,
               CampaignService
             ],
  entryComponents: [
                CampaignName,
                CampaignTemplate,
                CampaignAsin,
                CampaignTrigger
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }
