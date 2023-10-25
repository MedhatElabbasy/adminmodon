import { Component, OnInit } from '@angular/core';
import { Routing } from 'src/app/modules/core/routes/app-routes';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  links = {
   subscriptionPlan : `${Routing.subscription.children.subscriptionPlan}`,
   payment : `${Routing.subscription.children.payment}`,
   subscriptionPackageItems : `${Routing.subscription.children.subscriptionPackageItems}`
  };

  constructor() { }

  ngOnInit(): void {
  }

}
