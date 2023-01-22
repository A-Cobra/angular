import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CartAdditionOrUpdateResponse } from 'src/app/models/cart/cart-addition-response.type';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartFailureResponse } from 'src/app/models/cart/cart-failure-response.type';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartItemsResponse } from 'src/app/models/cart/cart-items-response.type';
import { CartPayloadForCreationOrUpdate } from 'src/app/models/cart/cart-payload-for-creation-or-update.typ';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  queryParams: string = '?include=image_attachment.blob';
  cartPath: string = 'cart';
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${environment.bearerToken}`,
  });

  constructor(private http: HttpClient) {}

  getCartData(): Observable<CartData> {
    return this.http
      .get<CartItemsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        {
          headers: this.headers,
        }
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
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        switchMap((cartItemsResponse: CartItemsResponse) => {
          return of(cartItemsResponse.data.items);
        })
      );
  }

  addItemToCart(
    payload: CartPayloadForCreationOrUpdate
  ): Observable<CartItem[]> {
    return this.http
      .post<CartAdditionOrUpdateResponse>(
        `${environment.applaudoApiBaseUrl}/${this.cartPath}`,
        payload,
        { headers: this.headers }
      )
      .pipe(
        catchError((error: CartFailureResponse) => {
          console.log('error in service');
          console.log(error);
          throw Error(error.error.errors[0].code);
        }),
        switchMap(
          (cartAdditionOrUpdateResponse: CartAdditionOrUpdateResponse) => {
            return of(cartAdditionOrUpdateResponse.data.items);
          }
        )
      );
  }
}
