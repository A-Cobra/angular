import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { Product } from 'src/app/models/product/product.interface';
import { CartService } from '../../services/cart.service';
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
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // this.productsService.getProduct('justins');
    console.log('Product Details');
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        this.currentSlug = urlData?.['productSlug'];
        this.productsService.getProduct(this.currentSlug).subscribe({
          next: (product: Product) => {
            this.currentProduct = product;
          },
          error: (error: Response) => {
            console.log('Error');
            console.log(error);
            // redirect to home page
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe;
  }

  onCartAddition(cartAdditionEvent: CartPayloadForCreation) {
    console.log('Adding an item to the cart');
    console.log('cartAdditionEvent');
    console.log(cartAdditionEvent);
    this.cartService.addItemToCart(cartAdditionEvent).subscribe({
      next: (cartItems: CartItem[]) => {
        console.log('Item Added correctly');
        console.log('cartItems');
        console.log(cartItems);
      },
      error: (errorCode: Error) => {
        // console.log('Error in all products');
        // console.log('errorCode');
        // console.log(errorCode);
        // console.log('errorCode.name');
        // console.log(errorCode.name);
        // console.log('errorCode.message');
        // console.log(errorCode.message);
        // console.log('errorCode.stack');
        // console.log(errorCode.stack);

        if (
          errorCode.message ===
          '4974656d2070726f647563745f76617269616e745f6964206973206e6f7420756e6971756520706572206f72646572'
        ) {
          console.log(
            'Item already in the cart, if you want to update the quantity, go there'
          );
        } else if (errorCode.message === '4e6f7420656e6f7567682073746f636b') {
          console.log(
            'Not enough stock for the selected item and quantity, please try it again'
          );
        }
      },
    });
  }
}
