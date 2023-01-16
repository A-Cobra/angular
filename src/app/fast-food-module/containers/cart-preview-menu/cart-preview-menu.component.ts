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
  carItemsSelectedStatus: boolean[] = [];
  cartMenu: MenuItem[] = [];
  totalItemsPrice: number[] = [];
  totalCartPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

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
        this.cartMenu.forEach((cartItem: MenuItem, index) => {
          this.carItemsSelectedStatus.unshift(false);
        });
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

  onCompleteOrder() {
    console.log('Completing order');
  }

  onCardClick(id: number, menuItem: MenuItem): void {
    if (this.previouslySelectedItemId === -1) {
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else if (
      this.previouslySelectedItemId === id &&
      this.carItemsSelectedStatus[id]
    ) {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['cart'],
            'menu-details': ['selection'],
          },
        },
      ]);
    } else if (this.previouslySelectedItemId === id) {
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else {
      this.carItemsSelectedStatus[this.previouslySelectedItemId] = false;
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    }
    this.carItemsSelectedStatus[id] = !this.carItemsSelectedStatus[id];
  }

  simulateRedirectionToItemDetails(id: number) {
    this.router.navigate([
      'fast-food',
      {
        outlets: {
          'menu-selection': ['cart'],
          'menu-details': ['selection'],
        },
      },
    ]);
    setTimeout(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['cart'],
            'menu-details': ['cart-item', id],
          },
        },
      ]);
    });
  }
}
