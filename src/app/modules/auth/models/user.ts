import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

export interface IUser {
  _token: string;
}

export class User {
  constructor(private _token: string) {}

  get token(): string | null {
    if (helper.isTokenExpired(this._token)) {
      return null;
    } else {
      return this._token;
    }
  }

  get role() {
    let _token = helper.decodeToken(this._token);
    return _token[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }
}
