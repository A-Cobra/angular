import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ProductResponse } from 'src/app/models/product-response.interface';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  queryParams: string = '?include=master,image_attachment.blob';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(
        `${environment.applaudoApiBaseUrl}/products/${this.queryParams}`
      )
      .pipe(
        switchMap((productResponse: ProductResponse) => {
          return of(productResponse.data);
        })
      );
  }
}
