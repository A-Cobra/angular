import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart-item.interface';

@Component({
  selector: 'app-cart-item',
  styleUrls: ['./cart-item.component.scss'],
  template: `
    <div *ngIf="cartItem">
      <!-- <div *ngIf="cartItem.image"></div> -->
      <h3>
        Name: <span>{{ cartItem.name }}</span>
      </h3>
      <h3>
        Price:
        <span>{{
          cartItem.price | currency : 'USD' : 'symbol' : '1.2-2'
        }}</span>
      </h3>
      <h3>
        Quantity: <span>{{ cartItem.quantity }}</span>
      </h3>
      <h3>
        Partial price: <span>{{ cartItem.total }}</span>
      </h3>
      <div>
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input()
  cartItem!: CartItem;
  constructor() {}
}
