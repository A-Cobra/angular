import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.loginService.isLoggedOut$.pipe(
      take(1),
      tap(loggedOut => {
        if (!loggedOut) {
          this.router.navigate(['grocery-store', 'home', 'all-products']);
        }
      })
    );
  }
}
