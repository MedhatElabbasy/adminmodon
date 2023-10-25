import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualsRoutingModule } from './individuals-routing.module';
import { IndividualsComponent } from './components/individuals/individuals.component';
import { GuardsComponent } from './components/guards/guards.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CoreModule } from '../core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    IndividualsComponent,
    GuardsComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    IndividualsRoutingModule,
    CoreModule,
    InfiniteScrollModule
  ]
})
export class IndividualsModule { }
