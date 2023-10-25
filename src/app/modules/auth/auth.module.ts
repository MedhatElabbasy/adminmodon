import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { AuthDeclarations, AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CoreModule, AuthRoutingModule],
  declarations: [AuthDeclarations],
})
export class AuthModule {}
