import { Component, OnInit } from '@angular/core';
import { Routing } from 'src/app/modules/core/routes/app-routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  login = `/${Routing.auth.module}/${Routing.auth.children.login}`;

  constructor() {}

  ngOnInit() {}
}
