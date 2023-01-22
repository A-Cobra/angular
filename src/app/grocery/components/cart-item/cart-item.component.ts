import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';

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
        <i class="fa-solid fa-trash" (click)="onDelete(cartItem.id)"></i>
      </div>
      <div>
        <input
          #quantity
          type="number"
          [value]="cartItem.quantity"
          placeholder="Number of Items" />
        <button (click)="onQuantityUpdate()">Update Quantity</button>
      </div>
    </div>
  `,
})
export class CartItemComponent {
  @Input()
  cartItem!: CartItem;
  @Output()
  cartItemRemoval: EventEmitter<CartPayloadForRemoval> =
    new EventEmitter<CartPayloadForRemoval>();
  @Output()
  cartItemUpdate: EventEmitter<CartPayloadForUpdate> =
    new EventEmitter<CartPayloadForUpdate>();
  @ViewChild('quantity') quantity!: ElementRef;

  constructor() {}

  onDelete(cartItemId: number) {
    console.log('Deleting item');
    console.log(cartItemId);
    this.cartItemRemoval.emit({
      data: {
        items: [
          {
            id: cartItemId,
            _destroy: true,
          },
        ],
      },
    });
  }

  onQuantityUpdate() {
    if (
      parseInt(this.quantity.nativeElement.value) === this.cartItem.quantity
    ) {
      console.log('YOu can not update TO THE SAME QUANTITY');
    }

    if (this.quantity.nativeElement.value <= 0) {
      console.log('You can not add 0 or less elements of a certain product');
    } else {
      if (this.quantity.nativeElement.value) {
        this.cartItemUpdate.emit({
          data: {
            items: [
              {
                id: this.cartItem.id,
                quantity: parseInt(this.quantity.nativeElement.value),
              },
            ],
          },
        });
        console.log('UPDATING cart');
      } else {
        console.log('Please ADD A QUANTITY');
      }
    }
  }
}
