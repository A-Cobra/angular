import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { CategoriesResponse } from 'src/app/models/categories-response.type';
import { ProductCategory } from 'src/app/models/product-category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private queryParams: string = '?[page][size]=0';
  private categoriesPath: string = 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<CategoriesResponse>(
        `${environment.applaudoApiBaseUrl}/${this.categoriesPath}${this.queryParams}`
      )
      .pipe(
        switchMap((categoriesResponse: CategoriesResponse) => {
          return of(categoriesResponse.data);
        })
      );
  }
}
