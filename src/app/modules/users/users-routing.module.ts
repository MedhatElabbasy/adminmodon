import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesResolver } from '../lookups/components/countries/countries.resolver';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { UsersResolver } from './components/users/users.resolver';
import { UsersRoutes } from './routes/users-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: UsersRoutes.manageUsers,
    pathMatch: 'full',
  },
  {
    path: UsersRoutes.manageUsers,
    component: ManageUsersComponent,
    resolve: {
      codes: CountriesResolver,
    },
    children: [
      {
        path: '',
        redirectTo: UsersRoutes.users,
        pathMatch: 'full',
      },
      {
        path: UsersRoutes.users,
        component: UsersComponent,
        resolve: {
          users: UsersResolver,
        },
      },
      {
        path: UsersRoutes.roles,
        component: RolesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
