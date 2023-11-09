import { Injectable } from '@angular/core';
import { LoginToken } from 'src/app/models/login-token.type';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginSuccessfulResponse } from 'src/app/models/login-successful-response.type';
import { LocalStorageService } from './local-storage.service';
import { parseJwt } from '../utils/parse-jwt';
import { checkTokenDuration } from '../utils/check-token-duration';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn: boolean = false;
  private loginUrl: string = 'users/login';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  checkLogin(loginToken: LoginToken): Observable<boolean> {
    return this.http
      .post<LoginSuccessfulResponse>(
        `${environment.applaudoApiBaseUrl}/${this.loginUrl}`,
        loginToken
      )
      .pipe(
        switchMap((loginSuccessfulResponse: LoginSuccessfulResponse) => {
          this.localStorageService.saveLoginToken(
            loginSuccessfulResponse.data.token
          );
          this.isLoggedIn = true;
          return of(true);
        }),
        catchError((error: Response) => {
          return of(false);
        })
      );
  }

  get isLoggedIn$(): Observable<boolean> {
    const loginToken = this.localStorageService.getLoginToken();
    if (loginToken === '') {
      this.isLoggedIn = false;
    } else {
      const tokenDuration = checkTokenDuration(loginToken);
      if (tokenDuration) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
    // ADD THE LOCAL STORAGE and check date
    return of(this.isLoggedIn);
  }
  get isLoggedOut$(): Observable<boolean> {
    const loginToken = this.localStorageService.getLoginToken();
    if (loginToken === '') {
      this.isLoggedIn = false;
    } else {
      const tokenDuration = checkTokenDuration(loginToken);
      if (tokenDuration) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
    return of(!this.isLoggedIn);
  }
}
