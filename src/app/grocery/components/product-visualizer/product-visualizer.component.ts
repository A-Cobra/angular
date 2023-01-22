import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CartPayloadForCreationOrUpdate } from 'src/app/models/cart/cart-payload-for-creation-or-update.typ';
import { Product } from 'src/app/models/product/product.interface';

@Component({
  selector: 'app-product-visualizer',
  styleUrls: ['./product-visualizer.component.scss'],
  template: `
    <div *ngIf="product">
      <div *ngIf="product.image" class="img-container">
        <img [src]="product.image.url" alt="" />
        <!-- <img [src]="imgUrl(product.image.url)" alt="" /> -->
      </div>
      <h3>
        Name: <span>{{ product.name }}</span>
      </h3>
      <div *ngIf="!shortenedContent">
        <div>
          <h3>Description:</h3>
          <p>{{ product.description }}</p>
        </div>
        <h3 *ngIf="product.category">
          Category: <span>{{ product.category.name }}</span>
        </h3>
      </div>
      <h3 *ngIf="product.master">
        Price:
        <span>{{
          product.master.price | currency : 'USD' : 'symbol' : '1.2-2'
        }}</span>
      </h3>
      <div class="like-dislike-display">
        <div class="likes">
          <i class="fa-solid fa-thumbs-up"></i>
          <span>{{ product.likes_up_count }}</span>
        </div>
        <div class="dislikes">
          <i class="fa-solid fa-thumbs-down"></i>
          <span>{{ product.likes_down_count }}</span>
        </div>
      </div>
      <h3 *ngIf="product.master">
        Stock: <span>{{ product.master.stock }}</span>
      </h3>
      <div class="buying-tools">
        <input
          #quantity
          type="number"
          placeholder="Number of Items"
          value="1" />
        <button (click)="onCartAddition()">Add to cart</button>
      </div>
    </div>
  `,
})
export class ProductVisualizerComponent {
  @Input()
  product!: Product;
  @Input()
  shortenedContent: boolean = true;
  @Output()
  cartAddition: EventEmitter<CartPayloadForCreationOrUpdate> =
    new EventEmitter<CartPayloadForCreationOrUpdate>();
  @ViewChild('quantity') quantity!: ElementRef;

  constructor() {}

  imgUrl(blobUrl: Blob): string {
    return URL.createObjectURL(blobUrl);
  }

  onCartAddition() {
    // WE NEED A SERVICE TO INFORM THE USER
    console.log('this.quantity.nativeElement.value');
    console.log(this.quantity.nativeElement.value);
    console.log('this.product.master?.stock');
    console.log(this.product.master?.stock);
    if (this.quantity.nativeElement.value <= 0) {
      console.log('You can not add 0 or less elements of a certain product');
    } else {
      if (this.quantity.nativeElement.value && this.product?.master) {
        if (this.quantity.nativeElement.value <= this.product.master.stock) {
          this.cartAddition.emit({
            data: {
              items: [
                {
                  product_variant_id: this.product.id,
                  quantity: parseInt(this.quantity.nativeElement.value),
                },
              ],
            },
          });
          console.log('Adding to cart');
        } else {
          console.log('Please add a quantity smaller or equal to the stock');
        }
      } else {
        console.log('Please ADD A QUANTITY');
      }
    }
  }
}
