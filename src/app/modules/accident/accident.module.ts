import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccidentRoutingModule } from './accident-routing.module';
import { AccidentComponent } from './accident.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    AccidentComponent
  ],
  imports: [
    CoreModule,
    AccidentRoutingModule
  ]
})
export class AccidentModule { }
