import { ClientsResolver } from './components/company-details/components/clients/clients.resolver';
import { SupervisorsResolver } from './components/company-details/components/supervisor/supervisors.resolver';
import { GuardResolver } from './components/company-details/components/guards/guard.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedCompaniesResolver } from './components/companies/approved-companies.resolver';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyDetailsResolver } from './components/company-details/company-details.resolver';
import { ClientsComponent } from './components/company-details/components/clients/clients.component';
import { GuardsComponent } from './components/company-details/components/guards/guards.component';
import { SupervisorComponent } from './components/company-details/components/supervisor/supervisor.component';
import { JoinRequestsComponent } from './components/join-requests/join-requests.component';
import { JoinRequestsResolver } from './components/join-requests/join-requests.resolver';
import { ManageCompaniesAccountsComponent } from './components/manage-companies-accounts/manage-companies-accounts.component';
import { RejectedCompaniesComponent } from './components/rejected-companies/rejected-companies.component';
import { RejectedCompaniesResolver } from './components/rejected-companies/rejected-companies.resolver';
import { SecurityCompaniesRoutes } from './routes/security-companies-routes.enum';
import { ClientDetailsComponent } from './components/company-details/components/client-details/client-details.component';
import { GeneralInfoComponent } from './components/company-details/components/client-details/general-info/general-info.component';
import { LocationComponent } from './components/company-details/components/client-details/location/location.component';
import { ClientGuardComponent } from './components/company-details/components/client-details/client-guard/client-guard.component';
import { GuardCardComponent } from './components/company-details/components/client-details/client-guard/guard-card/guard-card.component';
import { StatisticsComponent } from './components/company-details/components/statistics/statistics.component';
import { ClientStatisticsComponent } from './components/company-details/components/client-details/client-statistics/client-statistics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: SecurityCompaniesRoutes.manageAccounts,
    pathMatch: 'full',
  },
  {
    path: SecurityCompaniesRoutes.manageAccounts,
    component: ManageCompaniesAccountsComponent,
    children: [
      {
        path: '',
        redirectTo: SecurityCompaniesRoutes.companies,
        pathMatch: 'full',
      },
      {
        path: SecurityCompaniesRoutes.joinRequests,
        component: JoinRequestsComponent,
        resolve: {
          requests: JoinRequestsResolver,
        },
      },
      {
        path: SecurityCompaniesRoutes.companies,
        component: CompaniesComponent,
        resolve: {
          companies: ApprovedCompaniesResolver,
        },
      },
      {
        path: SecurityCompaniesRoutes.rejectedCompanies,
        component: RejectedCompaniesComponent,
        resolve: {
          companies: RejectedCompaniesResolver,
        },
      },
    ],
  },
  {
    path: SecurityCompaniesRoutes.clientDetails  + '/:id',
    component: ClientDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: SecurityCompaniesRoutes.generalInfo,
        pathMatch: 'full',
      },
      {
        path: SecurityCompaniesRoutes.generalInfo,
        component: GeneralInfoComponent,
      },
      {
        path: SecurityCompaniesRoutes.ClientStatistics,
        component: ClientStatisticsComponent,
      },
      {
        path: SecurityCompaniesRoutes.location,
        component: LocationComponent,
       
      },
      {
        path: SecurityCompaniesRoutes.clientGuard,
        component: ClientGuardComponent,
        children: [
          {
            path: SecurityCompaniesRoutes.guardCard  + '/:id',
            component: GuardCardComponent,
          }]
      }
    ]
  },
  {
    path: SecurityCompaniesRoutes.companyDetails + '/:id',
    component: CompanyDetailsComponent,
    resolve: {
      company: CompanyDetailsResolver,
    },
    children: [
      {
        path: '',
        redirectTo: SecurityCompaniesRoutes.clients,
        pathMatch: 'full',
      },
      {
        path: SecurityCompaniesRoutes.clients,
        component: ClientsComponent,
        resolve:{
          clients: ClientsResolver
        }
      },
      {
        path: SecurityCompaniesRoutes.guards,
        component: GuardsComponent,
        resolve:{
          guards: GuardResolver
        }
      },
      {
        path: SecurityCompaniesRoutes.supervisors,
        component: SupervisorComponent,
        resolve:{
          guards: SupervisorsResolver
        }
      },
      {
        path: SecurityCompaniesRoutes.statistics,
        component: StatisticsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityCompaniesRoutingModule {}
