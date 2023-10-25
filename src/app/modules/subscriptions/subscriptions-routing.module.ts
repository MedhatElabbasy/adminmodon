import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { SubscriptionPackageItemsComponent } from './components/subscription-package-items/subscription-package-items.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubscriptionsPlanComponent } from './components/subscriptions-plan/subscriptions-plan.component';
import { SubscriptionsRoutes } from './routes/subscription-routes.enum';

const routes: Routes = [
  {
    path:'',
    redirectTo: SubscriptionsRoutes.subscription,
    pathMatch:'full'
  },
  {
    path:SubscriptionsRoutes.subscription,
    component :SubscriptionComponent,
    children:[
      {
        path:'',
        redirectTo:SubscriptionsRoutes.subscriptionPlan,
        pathMatch:'full'
      },
      {
        path:SubscriptionsRoutes.subscriptionPlan,
        component:SubscriptionsPlanComponent
      },
      {
        path:SubscriptionsRoutes.payment,
        component:PaymentComponent
      },
      {
        path:SubscriptionsRoutes.subscriptionPackageItems,
        component:SubscriptionPackageItemsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
