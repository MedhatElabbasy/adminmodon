import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentComponent } from './accident.component';
import { AccidentResolver } from './accident.resolver';

const routes: Routes = [
  { path: '', component: AccidentComponent, resolve: {
  report: AccidentResolver
} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentRoutingModule { }
