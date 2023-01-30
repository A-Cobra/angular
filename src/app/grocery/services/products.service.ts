import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ProductsResponse } from 'src/app/models/product/products-response.interface';
import { Product } from 'src/app/models/product/product.interface';
import { environment } from 'src/environments/environment';
import { SingleProductResponse } from 'src/app/models/product/single-product-response.type';
import { SearchToolsEvent } from 'src/app/models/search-tools-event.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsPath: string = 'products';
  queryParams: string = '?include=master,image_attachment.blob,category';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.productsPath}/${this.queryParams}`
      )
      .pipe(
        switchMap((productsResponse: ProductsResponse) => {
          return of(productsResponse.data);
        })
      );
  }

  getProductsWithSearchingTools({
    category,
    nameQuery,
  }: SearchToolsEvent): Observable<Product[]> {
    const nameFilter = `&[filter][slug_cont]=${nameQuery}`;
    const categoryFilter = `&[filter][category_slug_eq]=${category}`;
    return this.http
      .get<ProductsResponse>(
        `${environment.applaudoApiBaseUrl}/${this.productsPath}/${this.queryParams}${nameFilter}${categoryFilter}`
      )
      .pipe(
        switchMap((productsResponse: ProductsResponse) => {
          return of(productsResponse.data);
        }),
        catchError(error => {
          throw Error(error);
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
