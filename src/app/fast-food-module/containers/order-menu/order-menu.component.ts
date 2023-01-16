import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order.type';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss'],
})
export class OrderMenuComponent implements OnInit {
  previouslySelectedItemId = -1;
  orders: Order[] = [];
  orderItemsSelectedStatus: boolean[] = [];
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
      },
      complete: () => {
        this.orders.forEach((order: Order, index) => {
          this.orderItemsSelectedStatus.unshift(false);
        });
        console.log(this.orderItemsSelectedStatus);
      },
    });
  }

  onCardClick(id: number, order: Order): void {
    if (this.previouslySelectedItemId === -1) {
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(order.id);
    } else if (
      this.previouslySelectedItemId === id &&
      this.orderItemsSelectedStatus[id]
    ) {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['order'],
            'menu-details': ['selection'],
          },
        },
      ]);
    } else if (this.previouslySelectedItemId === id) {
      this.simulateRedirectionToItemDetails(order.id);
    } else {
      this.orderItemsSelectedStatus[this.previouslySelectedItemId] = false;
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(order.id);
    }
    this.orderItemsSelectedStatus[id] = !this.orderItemsSelectedStatus[id];
  }

  simulateRedirectionToItemDetails(id: number) {
    this.router.navigate([
      'fast-food',
      {
        outlets: {
          'menu-selection': ['order'],
          'menu-details': ['selection'],
        },
      },
    ]);
    setTimeout(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['order'],
            // 'menu-details': ['cart-item', id],
          },
        },
      ]);
    });
  }
}
