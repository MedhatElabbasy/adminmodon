import { ClientsCompaniesResolver } from './modules/core/components/clients-companies/clients-companies.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ClientsCompaniesComponent } from './modules/core/components/clients-companies/clients-companies.component';
import { HomeComponent } from './modules/core/components/home/home.component';
import { LayoutComponent } from './modules/core/components/layout/layout.component';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';
import { SettingsComponent } from './modules/core/components/settings/settings.component';
import { UnauthorizedComponent } from './modules/core/components/unauthorized/unauthorized.component';
import { UnderConstructionComponent } from './modules/core/components/under-construction/under-construction.component';
import { IndividualsComponent } from './modules/individuals/components/individuals/individuals.component';
import { Routing } from './modules/core/routes/app-routes';

const routes: Routes = [
  { path: '', redirectTo: Routing.auth.module, pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: Routing.settings,
        component: SettingsComponent,
      },
      {
        path: Routing.underConstruction,
        component: UnderConstructionComponent,
      },
      {
        path: Routing.users.module,
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: Routing.dashboard.module,
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: Routing.individuals.module,
        loadChildren: () =>
          import('./modules/individuals/individuals.module').then((m) => m.IndividualsModule),
      },
      {
        path: Routing.agents.module,
        loadChildren: () =>
          import('./modules/agents/agents.module').then((m) => m.AgentsModule),
      },
      {
        path: Routing.subscription.module,
        loadChildren: () =>
          import('./modules/subscriptions/subscriptions.module').then((m) => m.SubscriptionsModule),
      },
      {
        path: Routing.lookups.module,
        loadChildren: () =>
          import('./modules/lookups/lookups.module').then(
            (m) => m.LookupsModule
          ),
      },
      {
        path: Routing.companies.module,
        loadChildren: () =>
          import('./modules/security-companies/security-companies.module').then(
            (m) => m.SecurityCompaniesModule
          ),
      },
      {
        path: Routing.contracts.module,
        loadChildren: () =>
          import('./modules/contracts/contracts.module').then(
            (m) => m.ContractsModule
          ),
      },
      {
        path: Routing.accident.module,
        loadChildren: () =>
          import('./modules/accident/accident.module').then(
            (m) => m.AccidentModule
          ),
      },
      {
        path: Routing.clients,
        component: ClientsCompaniesComponent,
        resolve: {
          clients: ClientsCompaniesResolver,
        },
      },
    ],
  },
  {
    path: Routing.auth.module,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: Routing.unauthorized,
    component: UnauthorizedComponent,
  },
  {
    path: Routing.notFound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: Routing.notFound,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
