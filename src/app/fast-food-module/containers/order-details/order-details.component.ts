import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concatMap, finalize, of, Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../models/menu-item.interface';
import { Order } from '../../models/order.type';
import { CartService } from '../../services/cart/cart.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  selectedOrder!: Order;
  selectedId!: number;
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  totalItemsPrice: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        console.log(urlData);
        this.selectedId = parseInt(urlData?.['id']);
        this.orderService.getOrderById(urlData?.['id']).subscribe({
          next: (order: Order) => {
            this.selectedOrder = order;
          },
          complete: () => {
            this.selectedOrder.orderItems.forEach((cartMenuItem: MenuItem) => {
              this.totalItemsPrice.push(this.calculatePrice(cartMenuItem));
            });
          },
        });
      });
  }

  calculatePrice(menuItem: MenuItem) {
    let recalculatedPrice = menuItem.basePrice;
    for (const customizableOption of menuItem.customizableOptions) {
      if (customizableOption?.options) {
        for (const option of customizableOption?.options) {
          if (option.selected) {
            recalculatedPrice += option.extraPrice ?? 0;
          }
        }
      }
    }
    return recalculatedPrice;
  }

  onAddSameItemsToCart(): void {
    const orders$ = of(...this.selectedOrder.orderItems);
    orders$
      .pipe(
        concatMap((menuItem: MenuItem) => {
          return this.cartService.addItemToTheCart(menuItem);
        }),
        finalize(() => {
          this.notificationsService.notifySameItemsAddedToCart();
        })
      )
      .subscribe({
        next: (menuItem: MenuItem) => {
          console.log('Added');
          console.log(menuItem);
        },
      });
  }
}
