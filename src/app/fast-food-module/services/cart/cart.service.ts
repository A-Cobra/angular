import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cartPath = 'cart';
  currentItemId!: number;
  getCartItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${environment.dataBaseBaseUrl}/${this.cartPath}`
    );
  }
  private postItemToCartDatabase(item: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(
      `${environment.dataBaseBaseUrl}/${this.cartPath}`,
      item
    );
  }
  addItemToTheCart(item: MenuItem): Observable<MenuItem> {
    const getId$ = this.getNumberOfCartItems();
    return getId$.pipe(
      switchMap((newId: number) => {
        item.id = newId;
        return this.postItemToCartDatabase(item);
      })
    );
  }
  getNumberOfCartItems() {
    return this.http
      .get<MenuItem[]>(`${environment.dataBaseBaseUrl}/${this.cartPath}`)
      .pipe(
        catchError(error => of([])),
        map((data: MenuItem[]) => {
          if (data.length > 0) {
            return data[data.length - 1].id + 1;
          }
          return 1;
        })
      );
  }
}
