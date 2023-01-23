import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';
import { CartService } from '../../services/cart.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData!: CartData;

  constructor(
    private cartService: CartService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartData().subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
      },
      error: (error: Response) => {
        this.notificationsService.notifyQueryError();
        this.router.navigate(['grocery-store', 'home', 'all-products']);
      },
    });
  }

  onCartItemRemoval(removalPayload: CartPayloadForRemoval) {
    this.cartService.removeItemFromCart(removalPayload).subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
        this.notificationsService.notifyItemRemovedSuccessfully();
      },
      error: (error: Response) => {
        this.notificationsService.notifyQueryError();
      },
    });
  }

  onCartItemUpdate(updatePayload: CartPayloadForUpdate) {
    console.log('updatePayload');
    console.log(updatePayload);
    this.cartService.updateItemQuantity(updatePayload).subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
        this.notificationsService.notifyItemUpdatedSuccessfully();
      },
      error: (errorCode: Error) => {
        if (errorCode.message === '4e6f7420656e6f7567682073746f636b') {
          this.notificationsService.notifyNotEnoughStock();
        }
      },
    });
  }
}
