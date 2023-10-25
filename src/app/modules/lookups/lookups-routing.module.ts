import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './components/areas/areas.component';
import { AreasResolver } from './components/areas/areas.resolver';
import { AvailableServicesComponent } from './components/available-services/available-services.component';
import { AvailableServicesResolver } from './components/available-services/available-services.resolver';
import { BloodTypeComponent } from './components/blood-type/blood-type.component';
import { BloodtypeResolver } from './components/blood-type/bloodtype.resolver';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { BusinessTypeResolver } from './components/business-type/business-type.resolver';
import { CitiesComponent } from './components/cities/cities.component';
import { CitiesResolver } from './components/cities/cities.resolver';
import { CompanyScaleComponent } from './components/company-scale/company-scale.component';
import { CompanyScaleResolver } from './components/company-scale/company-scale.resolver';
import { CompanyTypeComponent } from './components/company-type/company-type.component';
import { CompanyTypeResolver } from './components/company-type/company-type.resolver';
import { CountriesComponent } from './components/countries/countries.component';
import { CountriesResolver } from './components/countries/countries.resolver';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { FinanceYearComponent } from './components/finance-year/finance-year.component';
import { FinanceyearResolver } from './components/finance-year/financeyear.resolver';
import { GenderComponent } from './components/gender/gender.component';
import { GenderResolver } from './components/gender/gender.resolver';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { JobTypeComponent } from './components/job-type/job-type.component';
import { JobTypeResolver } from './components/job-type/job-type.resolver';
import { ManageSettingComponent } from './components/manage-setting/manage-setting.component';
import { SettingsResolver } from './components/manage-setting/settings.resolver';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { NationalityResolver } from './components/nationality/nationality.resolver';
import { OptionSetItemsComponent } from './components/option-set-items/option-set-items.component';
import { OptionsetitemResolver } from './components/option-set-items/optionsetitem.resolver';
import { OptionSetComponent } from './components/option-set/option-set.component';
import { OptionsetResolver } from './components/option-set/optionset.resolver';
import { PackageItemsComponent } from './components/package-items/package-items.component';
import { ShiftTypeComponent } from './components/shift-type/shift-type.component';
import { ShiftResolver } from './components/shift-type/shift.resolver';
import { StaticPagesComponent } from './components/static-pages/static-pages.component';
import { StaticpagesResolver } from './components/static-pages/staticpages.resolver';
import { TestNumberComponent } from './components/test-number/test-number.component';
import { TestNumberResolver } from './components/test-number/test-number.resolver';
import { TimeTypeComponent } from './components/time-type/time-type.component';
import { TimeTypeResolver } from './components/time-type/time-type.resolver';
import { TimeZoneComponent } from './components/time-zone/time-zone.component';
import { TimeZoneResolver } from './components/time-zone/time-zone.resolver';
import { LookupsRoutes } from './routes/lookups-routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: LookupsRoutes.countries,
    pathMatch: 'full',
  },
  {
    path: LookupsRoutes.areas,
    component: AreasComponent,
    resolve: {
      initData: AreasResolver,
    },
  },
  {
    path: LookupsRoutes.countries,
    component: CountriesComponent,
    resolve: {
      countries: CountriesResolver,
    },
  },
  {
    path: LookupsRoutes.areas,
    component: AreasComponent,
  },
  {
    path: LookupsRoutes.cities,
    component: CitiesComponent,
    resolve: {
      initData: CitiesResolver,
    },
  },
  {
    path: LookupsRoutes.packageItems,
    component: PackageItemsComponent,
  },
  {
    path: LookupsRoutes.companyScale,
    component: CompanyScaleComponent,
    resolve: {
      scales: CompanyScaleResolver,
    },
  },
  {
    path: LookupsRoutes.CompanyType,
    component: CompanyTypeComponent,
    resolve: {
      types: CompanyTypeResolver,
    },
  },
  {
    path: LookupsRoutes.shiftType,
    component: ShiftTypeComponent,
    resolve: {
      shifts: ShiftResolver,
    },
  },
  {
    path: LookupsRoutes.availableservices,
    component: AvailableServicesComponent,
    resolve: {
      initData: AvailableServicesResolver,
    },
  },
  {
    path: LookupsRoutes.timeType,
    component: TimeTypeComponent,
    resolve: {
      types: TimeTypeResolver,
    },
  },
  {
    path: LookupsRoutes.BusinessType,
    component: BusinessTypeComponent,
    resolve: {
      types: BusinessTypeResolver,
    },
  },

  {
    path: LookupsRoutes.BloodType,
    component: BloodTypeComponent,
    resolve: {
      initData: BloodtypeResolver,
    },
  },
  {
    path: LookupsRoutes.FinanceYear,
    component: FinanceYearComponent,
    resolve: {
      initData: FinanceyearResolver,
    },
  },

  {
    path: LookupsRoutes.Nationality,
    component: NationalityComponent,
    resolve: {
      initData: NationalityResolver,
    },
  },
  {
    path: LookupsRoutes.Gender,
    component: GenderComponent,
    resolve: {
      initData: GenderResolver,
    },
  },
  {
    path: LookupsRoutes.timeZone,
    component: TimeZoneComponent,
    resolve: {
      zones: TimeZoneResolver,
    },
  },
  {
    path: LookupsRoutes.jobtype,
    component: JobTypeComponent,
    resolve: {
      initData: JobTypeResolver,
    },
  },
  {
    path:LookupsRoutes.optionSet,
    component:OptionSetComponent,
    resolve:{
      initData:OptionsetResolver
    }
  },
  {
    path:LookupsRoutes.optionSetItems,
    component:OptionSetItemsComponent,
    resolve:{
      initData:OptionsetitemResolver
    }
  },
  {
    path:LookupsRoutes.manageSetting,
    component:ManageSettingComponent,
    resolve:{
      initData:SettingsResolver
    }
  },
  {
    path:LookupsRoutes.staticPages,
    component:StaticPagesComponent,
    resolve:{
      initData:StaticpagesResolver,

    }
  },
  {
    path:LookupsRoutes.testNumber,
    component:TestNumberComponent,
    resolve:{
      initData:TestNumberResolver,

    }
  },
  {
    path:LookupsRoutes.customerManagement,
    component:CustomerManagementComponent,

  },
  {
    path:LookupsRoutes.infractionDetails+ '/:id',
    component:InfractionDetailsComponent,

  },
  {
    path:LookupsRoutes.MonitoringComplaints,
    component:MonitoringComplaintsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
