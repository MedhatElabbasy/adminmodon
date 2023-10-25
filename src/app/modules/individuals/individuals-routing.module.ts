import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { GuardsComponent } from './components/guards/guards.component';
import { IndividualsComponent } from './components/individuals/individuals.component';
import { IndividualsRoutes } from './routes/individuals-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: IndividualsRoutes.individuals,
    pathMatch: 'full',
  },
  {
    path: IndividualsRoutes.individuals,
    component: IndividualsComponent,
    children: [
      {
        path: '',
        redirectTo: IndividualsRoutes.guards,
        pathMatch: 'full',
      },
      {
        path: IndividualsRoutes.guards,
        component: GuardsComponent,
      },
      {
        path: IndividualsRoutes.clients,
        component: ClientsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualsRoutingModule { }
