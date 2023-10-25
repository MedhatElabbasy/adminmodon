import { NgModule } from '@angular/core';
import { LookupsRoutingModule } from './lookups-routing.module';
import { CoreModule } from '../core/core.module';
import { CountriesComponent } from './components/countries/countries.component';
import { AreasComponent } from './components/areas/areas.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CompanyScaleComponent } from './components/company-scale/company-scale.component';
import { CompanyTypeComponent } from './components/company-type/company-type.component';
import { AvailableServicesComponent } from './components/available-services/available-services.component';
import { ShiftTypeComponent } from './components/shift-type/shift-type.component';
import { TimeTypeComponent } from './components/time-type/time-type.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { BloodTypeComponent } from './components/blood-type/blood-type.component';
import { FinanceYearComponent } from './components/finance-year/finance-year.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { GenderComponent } from './components/gender/gender.component';
import { TimeZoneComponent } from './components/time-zone/time-zone.component';
import { JobTypeComponent } from './components/job-type/job-type.component';
import { OptionSetComponent } from './components/option-set/option-set.component';
import { OptionSetItemsComponent } from './components/option-set-items/option-set-items.component';
import { ManageSettingComponent } from './components/manage-setting/manage-setting.component';
import { StaticPagesComponent } from './components/static-pages/static-pages.component';
import { TestNumberComponent } from './components/test-number/test-number.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { RasdUsersComponent } from './components/rasd-users/rasd-users.component';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { PackageItemsComponent } from './components/package-items/package-items.component';
import { MultiSelectorDropdownComponent } from './components/multi-selector-dropdown/multi-selector-dropdown.component';
import { EJAngular2Module } from 'ej-angular2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    CountriesComponent,
    AreasComponent,
    CitiesComponent,
    CompanyScaleComponent,
    CompanyTypeComponent,
    AvailableServicesComponent,
    ShiftTypeComponent,
    TimeTypeComponent,
    BusinessTypeComponent,
    BloodTypeComponent,
    FinanceYearComponent,
    NationalityComponent,
    GenderComponent,
    TimeZoneComponent,
    JobTypeComponent,
    OptionSetComponent,
    OptionSetItemsComponent,
    ManageSettingComponent,
    StaticPagesComponent,
    TestNumberComponent,
    CustomerManagementComponent,
    RasdUsersComponent,
    MonitoringComplaintsComponent,
    ComplaintsComponent,
    InfractionDetailsComponent,
    PackageItemsComponent,
    MultiSelectorDropdownComponent
  ],
  imports: [LookupsRoutingModule, CoreModule ,EJAngular2Module, NgMultiSelectDropDownModule.forRoot()],
})
export class LookupsModule {}
