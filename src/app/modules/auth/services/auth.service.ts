import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { StorageKeys } from '../../core/keys/storage-keys';
import { CryptoService } from '../../core/services/crypto.service';
import { OTP } from '../models/otp';
import { OtpResponse } from '../models/otp-response';
import { IUser, User } from '../models/user';
import * as lt from 'long-timeout';
import { VerifyModel } from '../models/verify-model';
import { VerifyResponse } from '../models/verify-response';
import { Router } from '@angular/router';
import { Routing } from '../../core/routes/app-routes';
import { UserInfo } from '../models/user-info';
import { environment } from 'src/environments/environment';
import { Roles } from '../enums/auth-types';
import { UsersRoutes } from '../../users/routes/users-routes.enum';
import { SecurityCompaniesRoutes } from '../../security-companies/routes/security-companies-routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiUrl;
  private helper = new JwtHelperService();
  private tokenExpirationTimer!: any;
  user = new BehaviorSubject<User | null>(null);
  userInfo = new BehaviorSubject<UserInfo | null>(null);
  snapshot!: {
    user: User | null;
    userInfo: UserInfo | null;
  };
  error:any
  constructor(
    private http: HttpClient,
    private crypto: CryptoService,
    private router: Router
  ) {
    this.snapshot = {
      user: null,
      userInfo: null,
    };
  }

  generateOTP(model: OTP) {
    return this.http.post<OtpResponse>(this.url + `auth/otp/generate`, model);
  }

  verify(model: VerifyModel) {
    return this.http
      .post<VerifyResponse>(this.url + `auth/otp/validate`, model)
  }

  handleToken(token: string) {
    const user = new User(token);
    if (user.role != Roles.Admin) {
      this.router.navigate([Routing.unauthorized]);
      return;
    } else {
      this.snapshot.user = user;
      this.user.next(user);
      this.crypto.setEncryptedStorage(StorageKeys.uid, user);
      this.getUserInfo();

      let expiry = this.helper.getTokenExpirationDate(token)?.valueOf()!;
      console.log(expiry);
      
      let today = new Date().valueOf();
      console.log(today);
      
      expiry = expiry - today;
      console.log(expiry);
      if(expiry < 0){
        this.logout();
      }
    }
  }

  logout() {
    this.snapshot.user = null;
    this.user.next(null);
    this.crypto.deleteEncryptedStorageByKey(StorageKeys.uid);

    if (this.tokenExpirationTimer) {
      lt.clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate([
      `/${Routing.auth.module}/${Routing.auth.children.login}`,
    ]);
  }

  autoLogin() {
    const token: IUser = this.crypto.getEncryptedStorage(StorageKeys.uid);
    console.log(token);
    
    if (!token) {
      return;
    } else {
      this.handleToken(token._token);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = lt.setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getUserInfo() {
    this.http
      .get<UserInfo>(this.url + `api/TakidAdmin/GetByAppUserId`)
      .subscribe((response) => {
        this.snapshot.userInfo = response;
        console.log(response)
        this.userInfo.next(response);
      });
  }
}
