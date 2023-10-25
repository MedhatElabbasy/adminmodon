import { NgModule } from '@angular/core';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsComponent } from './contracts.component';
import { AllContractsComponent } from './components/all-contracts/all-contracts.component';
import { RejectedContractsComponent } from './components/rejected-contracts/rejected-contracts.component';
import { AcceptedContractsComponent } from './components/accepted-contracts/accepted-contracts.component';
import { CoreModule } from '../core/core.module';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { ContractAccessDirective } from './directives/contract-access.directive';

@NgModule({
  declarations: [
    ContractsComponent,
    AllContractsComponent,
    RejectedContractsComponent,
    AcceptedContractsComponent,
    ContractDetailsComponent,
    ContractAccessDirective,
  ],
  imports: [CoreModule, ContractsRoutingModule],
})
export class ContractsModule {}
