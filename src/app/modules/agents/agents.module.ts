import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentComponent } from './components/agent/agent.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    AgentComponent
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    CoreModule
  ]
})
export class AgentsModule { }
