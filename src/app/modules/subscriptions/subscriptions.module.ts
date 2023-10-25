import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { CoreModule } from '../core/core.module';
import { SubscriptionsPlanComponent } from './components/subscriptions-plan/subscriptions-plan.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SubscriptionPackageItemsComponent } from './components/subscription-package-items/subscription-package-items.component';


@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionsPlanComponent,
    PaymentComponent,
    SubscriptionPackageItemsComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    CoreModule
  ]
})
export class SubscriptionsModule { }
