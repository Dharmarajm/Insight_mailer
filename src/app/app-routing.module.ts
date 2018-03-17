import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailStatusComponent } from './email-status/email-status.component';


import { AuthGuardService as AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
                         { path: '', component: LoginComponent, pathMatch: 'full' },
                         { path: 'register', component: RegisterComponent },
                         { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
                         { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
                         { path: 'campaign', component: CampaignComponent, canActivate: [AuthGuard] },
                         { path: 'new_campaign', component: CampaignNewComponent, canActivate: [AuthGuard] },
                         { path: 'edit_campaign/:id', component: CampaignEditComponent, canActivate: [AuthGuard] },
                         { path: 'promotion', component: PromotionComponent, canActivate: [AuthGuard] },
                         { path: 'promotion/:id', component: PromotionEditComponent, canActivate: [AuthGuard] },
                         { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                         { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
                         { path: 'email_status/:id', component: EmailStatusComponent, canActivate: [AuthGuard] },
                         { path: '**', component: LoginComponent }
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
