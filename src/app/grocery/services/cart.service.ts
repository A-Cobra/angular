import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartPath: string = 'cart';
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${environment.bearerToken}`,
  });

  constructor(private http: HttpClient) {}

  getCartItems(): void {
    this.http
      .get(`${environment.applaudoApiBaseUrl}/${this.cartPath}`, {
        headers: this.headers,
      })
      .subscribe({
        next: data => {
          console.log(data);
        },
      });
  }
}
