import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  headers: HttpHeaders;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    const token = localStorageService.getLoginToken();
    if (token === '') {
      this.router.navigate(['grocery-store']);
    }
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'origin-list',
      Authorization: `Bearer ${token}`,
    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneRequest = request.clone({
      headers: this.headers,
    });

    return next.handle(cloneRequest);
  }
}
