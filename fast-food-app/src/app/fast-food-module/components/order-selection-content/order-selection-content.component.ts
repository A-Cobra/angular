import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order.type';

@Component({
  selector: 'app-order-selection-content',
  styleUrls: ['./order-selection-content.component.scss'],
  template: `
    <div *ngIf="order">
      <div>
        <h3>Your ordered items:</h3>
        <p *ngFor="let orderedItem of order.orderItems">
          - {{ orderedItem.name }}
        </p>
      </div>
    </div>
  `,
})
export class OrderSelectionContentComponent {
  @Input()
  order!: Order;

  constructor() {}
}
