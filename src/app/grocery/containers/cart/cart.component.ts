import { Component, OnInit } from '@angular/core';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData!: CartData;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('ok on cart');
    this.cartService.getCartData().subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
        console.log(this.cartData);
        console.log('ITEM REMOVED SUCCESSFULLY');
      },
      error: (error: Response) => {
        console.log('ERROR');
        console.log(error);
      },
    });
  }

  onCartItemRemoval(removalPayload: CartPayloadForRemoval) {
    this.cartService.removeItemFromCart(removalPayload).subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
        console.log(this.cartData);
      },
      error: (error: Response) => {
        console.log('ERROR');
        console.log(error);
      },
    });
  }

  onCartItemUpdate(updatePayload: CartPayloadForUpdate) {
    console.log('updatePayload');
    console.log(updatePayload);
    this.cartService.updateItemQuantity(updatePayload).subscribe({
      next: (cartData: CartData) => {
        this.cartData = cartData;
        console.log(this.cartData);
      },
      error: (errorCode: Error) => {
        // if (
        //   errorCode.message ===
        //   '4974656d2070726f647563745f76617269616e745f6964206973206e6f7420756e6971756520706572206f72646572'
        // ) {
        //   console.log(
        //     'Item already in the cart, if you want to update the quantity, go there'
        //   );
        // } else
        if (errorCode.message === '4e6f7420656e6f7567682073746f636b') {
          console.log(
            'Not enough stock for the selected item and quantity, please try it again'
          );
        }
      },
    });
  }
}
