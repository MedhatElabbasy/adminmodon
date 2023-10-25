import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimeNgModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SettingsComponent } from './components/settings/settings.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { EmptyComponent } from './components/empty/empty.component';
import { NgxColorsModule } from 'ngx-colors';
import { TabLayoutComponent } from './components/tab-layout/tab-layout.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { ClientsCompaniesComponent } from './components/clients-companies/clients-companies.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgApexchartsModule } from 'ng-apexcharts';

const declarations: any = [
  ModalComponent,
  OffcanvasComponent,
  LoaderComponent,
  SettingsComponent,
  HomeComponent,
  LayoutComponent,
  UnauthorizedComponent,
  NotFoundComponent,
  SanitizerPipe,
  FilterPipe,
  UnderConstructionComponent,
  EmptyComponent,
  TabLayoutComponent,
  StatusBadgeComponent,
];

const references: any = [
  CommonModule,
  Ng2SearchPipeModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  HttpClientModule,
  IonicModule.forRoot(),
  AngularSvgIconModule.forRoot(),
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: loader,
      deps: [HttpClient],
    },
    isolate: false,
  }),
  NgxPaginationModule,
  PrimeNgModule,
  NgxCaptchaModule,
  NgOtpInputModule,
  NgxColorsModule,
  Ng2SearchPipeModule,
  InfiniteScrollModule,
  NgApexchartsModule
];

@NgModule({
  declarations: [declarations],
  imports: [references],
  exports: [declarations, references],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}

export function loader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function convertDateToString(date: any) {
  return new Date(date)
    .toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'numeric',
    })
    .replace('/', '-')
    .replace('/', '-');
}
