import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.interface';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-preview-menu',
  templateUrl: './cart-preview-menu.component.html',
  styleUrls: ['./cart-preview-menu.component.scss'],
})
export class CartPreviewMenuComponent implements OnInit {
  previouslySelectedItemId = -1;
  cartMenu: MenuItem[] = [];
  constructor(private cartService: CartService, private router: Router) {}
  totalItemsPrice: number[] = [];
  totalCartPrice: number = 0;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (menu: MenuItem[]) => {
        this.cartMenu = menu;
      },
      complete: () => {
        this.cartMenu.forEach((cartMenuItem: MenuItem) => {
          this.totalItemsPrice.push(this.calculatePrice(cartMenuItem));
        });
        this.totalCartPrice = this.totalItemsPrice.reduce(
          (item1, item2) => item1 + item2,
          0
        );
      },
    });
  }

  calculatePrice(menuItem: MenuItem) {
    console.log('Recalculating price');
    let recalculatedPrice = menuItem.basePrice;
    console.log('recalculatedPrice base price');
    console.log(recalculatedPrice);
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

  onCardClick() {
    console.log('Creating form');
  }

  onCompleteOrder() {
    console.log('Completing order');
  }
}
