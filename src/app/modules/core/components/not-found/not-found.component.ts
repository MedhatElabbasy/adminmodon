import { Component, OnInit } from '@angular/core';
import { UsersRoutes } from 'src/app/modules/users/routes/users-routes.enum';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  link = `/${UsersRoutes.users}`;

  constructor() {}

  ngOnInit() {}
}
