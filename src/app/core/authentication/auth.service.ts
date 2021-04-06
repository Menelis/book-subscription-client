import { UserForRegistrationDto } from './../models/user-for-registration-dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { Subject } from 'rxjs';
import { UserForRegistrationResponseDto } from '../models/user-for-registration-response-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForAuthenticationDto } from '../models/user-for-authentication-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authChangeSub = new Subject<boolean>();

  constructor(private urlEnvironment: EnvironmentUrlService, private http: HttpClient,
            private _jwtHelper: JwtHelperService) { }

  register = (user: UserForRegistrationDto) => {
    return this.http.post<UserForRegistrationResponseDto>(this.createCompleteRoute('account/register'), user);
  }
  private createCompleteRoute = (route: string) =>{
    return `${this.urlEnvironment.apiUrl}${route}`;
  }

  /**
   * Returns true if token has expired else false
   * @param token  - Token
   * @returns - boolean
   */
  public HasTokenExpired = (token: string) => {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

    return (Math.floor((new Date).getTime()/1000)) >= expiry
  }

  get isAuthenticated(){
    let token = localStorage.getItem('token');

    return !!token && !this._jwtHelper.isTokenExpired(token) ? true : false;
  }

  public logout = () => {
    localStorage.removeItem('token');
  }

  public login = (credentials: UserForAuthenticationDto) => {
    return this.http.post(this.createCompleteRoute('account/login'), credentials);
  }
  get FullName(){
    let token = localStorage.getItem('token');

    let fullName = !!token && this._jwtHelper.decodeToken(token).FullName;

    return fullName;
  }

  get UserId(){
    let token = localStorage.getItem('token') || null;

    if(!token) return null;

    return this._jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    }
}
