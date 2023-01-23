import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CartResponse } from 'src/app/models/cart/cart-response.type';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartFailureResponse } from 'src/app/models/cart/cart-failure-response.type';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartItemsResponse } from 'src/app/models/cart/cart-items-response.type';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { environment } from 'src/environments/environment';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  queryParams: string = '?include=image_attachment.blob';
  cartPath: string = 'cart';

  constructor(private http: HttpClient) {}

  getCartData(): Observable<CartData> {
    return this.http
      .get<CartItemsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`
      )
      .pipe(
        switchMap((cartItemsResponse: CartItemsResponse) => {
          return of(cartItemsResponse.data);
        })
      );
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http
      .get<CartItemsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`
      )
      .pipe(
        switchMap((cartItemsResponse: CartItemsResponse) => {
          return of(cartItemsResponse.data.items);
        })
      );
  }

  addItemToCart(payload: CartPayloadForCreation): Observable<CartItem[]> {
    return this.http
      .post<CartResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        payload
      )
      .pipe(
        catchError((error: CartFailureResponse) => {
          console.log('error in service');
          console.log(error);
          throw Error(error.error.errors[0].code);
        }),
        switchMap((cartAdditionOrUpdateResponse: CartResponse) => {
          return of(cartAdditionOrUpdateResponse.data.items);
        })
      );
  }

  removeItemFromCart(payload: CartPayloadForRemoval): Observable<CartData> {
    return this.http
      .put<CartItemsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        payload
      )
      .pipe(
        catchError((error: CartFailureResponse) => {
          console.log('error in service');
          console.log(error);
          throw Error(error.error.errors[0].code);
        }),
        switchMap((cartItemsResponse: CartItemsResponse) => {
          return of(cartItemsResponse.data);
        })
      );
  }

  updateItemQuantity(payload: CartPayloadForUpdate): Observable<CartData> {
    return this.http
      .put<CartItemsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        payload
      )
      .pipe(
        catchError((error: CartFailureResponse) => {
          console.log('error in service');
          console.log(error);
          throw Error(error.error.errors[0].code);
        }),
        switchMap((cartItemsResponse: CartItemsResponse) => {
          return of(cartItemsResponse.data);
        })
      );
  }
}
