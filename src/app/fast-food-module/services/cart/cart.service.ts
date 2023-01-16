import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cartPath = 'cart';
  getCartItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${environment.dataBaseBaseUrl}/${this.cartPath}`
    );
  }
  addItemToTheCart(item: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(
      `${environment.dataBaseBaseUrl}/${this.cartPath}`,
      item
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
