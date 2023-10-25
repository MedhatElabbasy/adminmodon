import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { UsersRoutingModule } from './users-routing.module';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [ManageUsersComponent, RolesComponent, UsersComponent],
  imports: [CoreModule, UsersRoutingModule],
})
export class UsersModule {}
