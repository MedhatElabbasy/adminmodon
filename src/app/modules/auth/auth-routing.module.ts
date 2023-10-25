import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesCodesResolver } from '../core/resolvers/countries-codes.resolver';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { AuthRoutes } from './routes/auth-routes.enum';



const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: AuthRoutes.login, pathMatch: 'full' },
      {
        path: AuthRoutes.login,
        component: LoginComponent,
        resolve: {
          codes: CountriesCodesResolver,
        },
      },
      { path: AuthRoutes.forgotPassword, component: ForgotPasswordComponent },
      { path: AuthRoutes.otp + '/:phone', component: OtpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

export const AuthDeclarations = [
  LoginComponent,
  ForgotPasswordComponent,
  AuthComponent,
  OtpComponent,
];
