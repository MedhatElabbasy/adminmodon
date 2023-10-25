import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCompaniesAccountsComponent } from './components/manage-companies-accounts/manage-companies-accounts.component';
import { JoinRequestsComponent } from './components/join-requests/join-requests.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CoreModule } from '../core/core.module';
import { SecurityCompaniesRoutingModule } from './security-companies.routing.module';
import { RejectedCompaniesComponent } from './components/rejected-companies/rejected-companies.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ClientsComponent } from './components/company-details/components/clients/clients.component';
import { SupervisorComponent } from './components/company-details/components/supervisor/supervisor.component';
import { GuardsComponent } from './components/company-details/components/guards/guards.component';
import { CompanyOverviewComponent } from './components/company-overview/company-overview.component';
import { ClientDetailsComponent } from './components/company-details/components/client-details/client-details.component';
import { LocationComponent } from './components/company-details/components/client-details/location/location.component';
import { GeneralInfoComponent } from './components/company-details/components/client-details/general-info/general-info.component';
import { ClientGuardComponent } from './components/company-details/components/client-details/client-guard/client-guard.component';
import { GuardCardComponent } from './components/company-details/components/client-details/client-guard/guard-card/guard-card.component';
import { StatisticsComponent } from './components/company-details/components/statistics/statistics.component';
import { ClientStatisticsComponent } from './components/company-details/components/client-details/client-statistics/client-statistics.component';

@NgModule({
  declarations: [
    ManageCompaniesAccountsComponent,
    JoinRequestsComponent,
    CompaniesComponent,
    RejectedCompaniesComponent,
    CompanyDetailsComponent,
    ClientsComponent,
    SupervisorComponent,
    GuardsComponent,
    CompanyOverviewComponent,
    ClientDetailsComponent,
    LocationComponent,
    GeneralInfoComponent,
    ClientGuardComponent,
    GuardCardComponent,
    StatisticsComponent,
    ClientStatisticsComponent
  ],
  imports: [CoreModule, SecurityCompaniesRoutingModule],
})
export class SecurityCompaniesModule {}
