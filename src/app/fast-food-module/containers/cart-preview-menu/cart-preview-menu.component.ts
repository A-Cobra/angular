import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.interface';
import { Order } from '../../models/order.type';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-cart-preview-menu',
  templateUrl: './cart-preview-menu.component.html',
  styleUrls: ['./cart-preview-menu.component.scss'],
})
export class CartPreviewMenuComponent implements OnInit {
  cartEditingStatus: boolean = false;
  previouslySelectedItemId = -1;
  cartItemsSelectedStatus: boolean[] = [];
  cartMenu: MenuItem[] = [];
  totalItemsPrice: number[] = [];
  totalCartPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

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
          this.cartItemsSelectedStatus.unshift(false);
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
    const newOrder: Order = {
      id: 0,
      orderItems: this.cartMenu,
    };
    console.log(newOrder);
    this.orderService.addOrder(newOrder).subscribe({
      next: (order: Order) => {
        console.log('Added ORDER');
        console.log(order);
        this.router.navigate(['']);
      },
    });
    // Redirect to burger;
    // emptyCart();
  }

  onCardClick(id: number, menuItem: MenuItem): void {
    if (this.previouslySelectedItemId === -1) {
      this.cartEditingStatus = true;
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else if (
      this.previouslySelectedItemId === id &&
      this.cartItemsSelectedStatus[id]
    ) {
      this.cartEditingStatus = false;
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
      this.cartEditingStatus = true;
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else {
      this.cartEditingStatus = true;
      this.cartItemsSelectedStatus[this.previouslySelectedItemId] = false;
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    }
    this.cartItemsSelectedStatus[id] = !this.cartItemsSelectedStatus[id];
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
