import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartItemsResponse } from 'src/app/models/cart/cart-items-response.type';
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
}
