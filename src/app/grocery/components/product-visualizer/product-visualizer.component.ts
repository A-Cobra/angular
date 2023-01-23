import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { Product } from 'src/app/models/product/product.interface';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-product-visualizer',
  styleUrls: ['./product-visualizer.component.scss'],
  template: `
    <div class="grid-wrapper" *ngIf="product">
      <div *ngIf="product.image" class="img-container">
        <img [src]="product.image.url" alt="" />
        <!-- <img [src]="imgUrl(product.image.url)" alt="" /> -->
      </div>
      <h3>
        Name: <span>{{ product.name }}</span>
      </h3>
      <div class="shortened-content" *ngIf="!shortenedContent">
        <div>
          <h3>
            Description: <span>{{ product.description }}</span>
          </h3>
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
      <h3
        [ngClass]="{
          'empty-stock': product.master.stock === 0,
          'negative-stock': negativeStock
        }"
        *ngIf="product.master">
        Stock: <span>{{ product.master.stock }}</span>
      </h3>
      <div class="buying-tools">
        <input
          (change)="updateStockClass()"
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
  cartAddition: EventEmitter<CartPayloadForCreation> =
    new EventEmitter<CartPayloadForCreation>();
  @ViewChild('quantity') quantity!: ElementRef;
  negativeStock: boolean = false;

  constructor(private notificationsService: NotificationsService) {}

  imgUrl(blobUrl: Blob): string {
    return URL.createObjectURL(blobUrl);
  }

  onCartAddition() {
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
          this.notificationsService.notifyNotEnoughStock();
        }
      } else {
        console.log('Please ADD A QUANTITY');
      }
    }
  }

  updateStockClass() {
    if (this.product?.master) {
      this.negativeStock =
        this.product.master.stock < this.quantity.nativeElement.value;
    }
  }
}
