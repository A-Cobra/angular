import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.type';

@Component({
  selector: 'app-order-selection-header',
  styleUrls: ['./order-selection-header.component.scss'],
  template: `
    <div class="order-selection-header-container">
      <article>
        <div class="text">
          <div class="main-info">
            <h3>Order #{{ order.id }}</h3>
            <p *ngIf="order.totalPrice">
              Total Order Price:
              <span>
                {{ order.totalPrice | currency : 'USD' : 'symbol' : '1.2-2' }}
              </span>
            </p>
          </div>
          <div class="description">
            {{ order.date | date : 'medium' }}
          </div>
        </div>
        <div class="icon">
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </article>
    </div>
  `,
})
export class OrderSelectionOrderComponent {
  @Input()
  order!: Order;
  constructor() {}
}
