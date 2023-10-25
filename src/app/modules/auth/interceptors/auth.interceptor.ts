import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

const Excluded_Domains = ['otp', 'validate', 'lookup', 'generatev2'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(request);

        let modified = request.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + user.token,
          }),
        });

        return next.handle(modified);
      })
    );
  }
}
