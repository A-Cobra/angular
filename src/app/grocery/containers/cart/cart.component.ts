import { Component, OnInit } from '@angular/core';
import { CartData } from 'src/app/models/cart/cart-data.interface';
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
    // this.cartService.getCartData().subscribe({
    //   next: (cartData: CartData) => {
    //     this.cartData = cartData;
    //     console.log(this.cartData);
    //   },
    // });
  }
}
