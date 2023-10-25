import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './components/agent/agent.component';
import { AgentsRoutes } from './routes/agents-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: AgentsRoutes.agents,
    pathMatch: 'full',
  },

  {
    path: AgentsRoutes.agents,
    component:AgentComponent,
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
