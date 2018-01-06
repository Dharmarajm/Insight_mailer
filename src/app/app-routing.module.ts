import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { CampaignComponent } from './campaign/campaign.component';

const routes: Routes = [
                         { path: '', component: LoginComponent, pathMatch: 'full' },
                         { path: 'register', component: RegisterComponent },
                         { path: 'inventory', component: InventoryComponent },
                         { path: 'order', component: OrderComponent },
                         { path: 'campaign', component: CampaignComponent },
                         { path: '**', component: LoginComponent }
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
