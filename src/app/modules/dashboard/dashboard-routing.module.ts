import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutes } from './routes/dashboard-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: DashboardRoutes.dashboard,
    pathMatch: 'full',
  },

  {
    path: DashboardRoutes.dashboard,
    component:DashboardComponent,
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
