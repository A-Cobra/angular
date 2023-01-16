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

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (menu: MenuItem[]) => {
        this.cartMenu = menu;
      },
    });
  }
}
