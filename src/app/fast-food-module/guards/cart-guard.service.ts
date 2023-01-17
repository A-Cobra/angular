import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, pipe, switchMap } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { NotificationsService } from '../services/notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class CartGuardService implements CanActivate {
  constructor(
    private cartService: CartService,
    private notificationsService: NotificationsService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.cartService.getNumberOfCartItems().pipe(
      switchMap((number: Number) => {
        if (number === 1) {
          this.notificationsService.notifyEmptyCart();
        }
        return of(number === 1 ? false : true);
        // return number === 1 ? false : true;
      })
    );
  }
}
