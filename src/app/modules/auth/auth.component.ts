import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from '../core/routes/app-routes';
import { SecurityCompaniesRoutes } from '../security-companies/routes/security-companies-routes.enum';
import { UsersRoutes } from '../users/routes/users-routes.enum';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.snapshot.user) {
      this.router.navigate([`/${Routing.dashboard.module}`]);
    }
  }

  ngOnInit() {}
}
