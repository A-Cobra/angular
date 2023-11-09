import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(): boolean | Observable<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    return this.loginService.isLoggedIn$.pipe(
      take(1),
      tap(allowed => {
        if (!allowed) {
          this.router.navigate(['grocery-store']);
        }
      })
    );
  }
}
