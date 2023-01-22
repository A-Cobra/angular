import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreationOrUpdate } from 'src/app/models/cart/cart-payload-for-creation-or-update.typ';
import { ProductCategory } from 'src/app/models/product/product-category.interface';
import { Product } from 'src/app/models/product/product.interface';
import { SearchToolsEvent } from 'src/app/models/search-tools-event.type';
import { CartService } from '../../services/cart.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  categories: ProductCategory[] = [];
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (productsArray: Product[]) => {
        console.log(productsArray);
        this.products = productsArray;
      },
    });
    this.categoriesService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        console.log(this.categories);
      },
    });
    console.log('Products COMPONENT');
  }

  onSearchingToolsUsage(searchToolsEvent: SearchToolsEvent) {
    console.log('searchToolsEvent');
    console.log(searchToolsEvent);
    this.productsService
      .getProductsWithSearchingTools(searchToolsEvent)
      .subscribe({
        next: (productsArray: Product[]) => {
          console.log(productsArray);
          this.products = productsArray;
        },
      });
  }

  onCartAddition(cartAdditionEvent: CartPayloadForCreationOrUpdate) {
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
