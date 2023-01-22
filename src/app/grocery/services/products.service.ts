import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ProductsResponse } from 'src/app/models/products-response.interface';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment';
import { SingleProductResponse } from 'src/app/models/single-product-response.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  queryParams: string = '?include=master,image_attachment.blob';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>(
        `${environment.applaudoApiBaseUrl}/products/${this.queryParams}`
      )
      .pipe(
        switchMap((productsResponse: ProductsResponse) => {
          return of(productsResponse.data);
        })
      );
  }
  getProduct(productSlug: string): Observable<Product> {
    return this.http
      .get<SingleProductResponse>(
        `${environment.applaudoApiBaseUrl}/products/${productSlug}${this.queryParams}`
      )
      .pipe(
        switchMap((productResponse: SingleProductResponse) => {
          return of(productResponse.data);
        })
      );
  }
}
