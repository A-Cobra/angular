import { Injectable } from '@angular/core';
import { LoginToken } from 'src/app/models/login-token.type';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginSuccessfulResponse } from 'src/app/models/login-successful-response.type';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn: boolean = false;
  private loginUrl: string = 'users/login';

  constructor(private http: HttpClient) {}

  checkLogin(loginToken: LoginToken): Observable<boolean> {
    return this.http
      .post<LoginSuccessfulResponse>(
        `${environment.applaudoApiBaseUrl}/${this.loginUrl}`,
        loginToken
      )
      .pipe(
        switchMap((loginSuccessfulResponse: LoginSuccessfulResponse) => {
          this.isLoggedIn = true;
          return of(true);
        }),
        catchError((error: Response) => {
          return of(false);
        })
      );
  }

  get isLoggedIn$(): Observable<boolean> {
    return of(this.isLoggedIn);
  }
}
