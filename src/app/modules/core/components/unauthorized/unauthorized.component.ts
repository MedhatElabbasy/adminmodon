import { Component, OnInit } from '@angular/core';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  link = `/${Routing.auth.module}/${Routing.auth.children.login}`;

  constructor() {}

  ngOnInit() {}
}
