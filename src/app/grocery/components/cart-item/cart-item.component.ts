import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-cart-item',
  styleUrls: ['./cart-item.component.scss'],
  template: `
    <div class="grid-wrapper" *ngIf="cartItem">
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
        Partial price:
        <span>{{
          cartItem.total | currency : 'USD' : 'symbol' : '1.2-2'
        }}</span>
      </h3>
      <div>
        <i class="fa-solid fa-trash" (click)="onDelete(cartItem.id)"></i>
      </div>
      <div class="tools">
        <input
          #quantity
          type="number"
          [value]="cartItem.quantity"
          placeholder="Number of Items" />
        <button class="update-quantity-button" (click)="onQuantityUpdate()">
          Update Quantity
        </button>
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

  constructor(private notificationsService: NotificationsService) {}

  onDelete(cartItemId: number) {
    if (confirm('Are you sure you want to delete the product?')) {
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
  }

  onQuantityUpdate() {
    if (
      parseInt(this.quantity.nativeElement.value) === this.cartItem.quantity
    ) {
      this.notificationsService.notifyNonEqualUpdate();
    } else {
      if (this.quantity.nativeElement.value <= 0) {
        this.notificationsService.notifyNonNegativeQuantity();
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
        }
      }
    }
  }
}
