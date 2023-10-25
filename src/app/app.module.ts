import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, loader } from './modules/core/core.module';
import { Language } from './modules/core/data/languages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClientsCompaniesComponent } from './modules/core/components/clients-companies/clients-companies.component';
import { EJAngular2Module } from 'ej-angular2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent, ClientsCompaniesComponent],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    NgMultiSelectDropDownModule.forRoot(),
    EJAngular2Module.forRoot(),
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: Language.default,
      loader: {
        provide: TranslateLoader,
        useFactory: loader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
