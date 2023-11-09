import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderPath = 'orders';
  currentItemId!: number;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${environment.dataBaseBaseUrl}/${this.orderPath}`
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${environment.dataBaseBaseUrl}/${this.orderPath}/${id}`
    );
  }

  getNextOrderId(): Observable<number> {
    return this.getOrders().pipe(
      catchError(error => of([])),
      map((data: Order[]) => {
        if (data.length > 0) {
          return data[data.length - 1].id + 1;
        }
        return 1;
      })
    );
  }

  private postOrderToDatabase(order: Order): Observable<Order> {
    return this.http.post<Order>(
      `${environment.dataBaseBaseUrl}/${this.orderPath}`,
      order
    );
  }

  addOrder(order: Order): Observable<Order> {
    const getId$ = this.getNextOrderId();
    return getId$.pipe(
      switchMap((newId: number) => {
        order.id = newId;
        return this.postOrderToDatabase(order);
      })
    );
  }
}
