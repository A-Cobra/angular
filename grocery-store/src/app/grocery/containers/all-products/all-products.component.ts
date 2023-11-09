import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { ProductCategory } from 'src/app/models/product/product-category.interface';
import { Product } from 'src/app/models/product/product.interface';
import { SearchToolsEvent } from 'src/app/models/search-tools-event.type';
import { CartService } from '../../services/cart.service';
import { CategoriesService } from '../../services/categories.service';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  state$: Observable<boolean> = new Observable();
  items$: Observable<Product[]> = new Observable<Product[]>();
  categories: ProductCategory[] = [];
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private notificationsService: NotificationsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (productsArray: Product[]) => {
        this.products = productsArray;
      },
      error: () => {
        this.notificationsService.notifyQueryError();
      },
    });
    this.categoriesService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
      },
      error: () => {
        this.notificationsService.notifyQueryError();
      },
    });
  }

  onSearchingToolsUsage(searchToolsEvent: SearchToolsEvent) {
    this.productsService
      .getProductsWithSearchingTools(searchToolsEvent)
      .subscribe({
        next: (productsArray: Product[]) => {
          this.products = productsArray;
        },
        error: () => {
          this.notificationsService.notifyQueryError();
        },
      });
  }

  onCartAddition(cartAdditionEvent: CartPayloadForCreation) {
    this.cartService.addItemToCart(cartAdditionEvent).subscribe({
      next: (cartItems: CartItem[]) => {
        this.notificationsService.notifySuccessfulCartAddition();
      },
      error: (errorCode: Error) => {
        if (
          errorCode.message ===
          '4974656d2070726f647563745f76617269616e745f6964206973206e6f7420756e6971756520706572206f72646572'
        ) {
          this.notificationsService.notifyItemAlreadyInCart();
        } else if (errorCode.message === '4e6f7420656e6f7567682073746f636b') {
          this.notificationsService.notifyNotEnoughStock();
        }
      },
    });
  }
}
