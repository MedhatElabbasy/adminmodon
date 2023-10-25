import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedContractsComponent } from './components/accepted-contracts/accepted-contracts.component';
import { AcceptedContractsResolver } from './components/accepted-contracts/accepted-contracts.resolver';
import { AllContractsComponent } from './components/all-contracts/all-contracts.component';
import { AllContractsResolver } from './components/all-contracts/all-contracts.resolver';
import { RejectedContractsComponent } from './components/rejected-contracts/rejected-contracts.component';
import { RejectedContractsResolver } from './components/rejected-contracts/rejected-contracts.resolver';
import { ContractsComponent } from './contracts.component';
import { ContractsRoutes } from './routes/contracts-routes';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
    children: [
      { path: '', redirectTo: ContractsRoutes.allContracts, pathMatch: 'full' },
      {
        path: ContractsRoutes.allContracts,
        component: AllContractsComponent,
        resolve: {
          contracts: AllContractsResolver,
        },
      },
      {
        path: ContractsRoutes.accepted,
        component: AcceptedContractsComponent,
        resolve: {
          contracts: AcceptedContractsResolver,
        },
      },
      {
        path: ContractsRoutes.rejected,
        component: RejectedContractsComponent,
        resolve: {
          contracts: RejectedContractsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}
