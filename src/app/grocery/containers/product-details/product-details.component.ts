import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { Product } from 'src/app/models/product/product.interface';
import { CartService } from '../../services/cart.service';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  currentProduct!: Product;
  currentSlug!: string;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        this.currentSlug = urlData?.['productSlug'];
        this.productsService.getProduct(this.currentSlug).subscribe({
          next: (product: Product) => {
            this.currentProduct = product;
          },
          error: (error: Response) => {
            this.notificationsService.notifyQueryError();
            this.router.navigate(['grocery-store', 'home', 'all-products']);
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe;
  }

  onCartAddition(cartAdditionEvent: CartPayloadForCreation) {
    this.cartService.addItemToCart(cartAdditionEvent).subscribe({
      next: () => {
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
