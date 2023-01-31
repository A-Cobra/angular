import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { Product } from 'src/app/models/product/product.interface';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-product-visualizer',
  styleUrls: ['./product-visualizer.component.scss'],
  templateUrl: './product-visualizer.component.html',
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

  onCartAddition() {
    if (this.quantity.nativeElement.value <= 0) {
      this.notificationsService.notifyNonNegativeQuantity();
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
        } else {
          this.notificationsService.notifyNotEnoughStock();
        }
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
