import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-visualizer',
  styleUrls: ['./product-visualizer.component.scss'],
  template: `
    <div *ngIf="product">
      <div *ngIf="product.image" class="img-container">
        <img [src]="product.image.url" alt="" />
      </div>
      <h3>
        Name: <span>{{ product.name }}</span>
      </h3>
      <h3 *ngIf="product.master">
        Price: <span>{{ product.master.price }}</span>
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
      <div *ngIf="!shortenedContent && product.master">
        <div>
          <h3>Description:</h3>
          <p>product.description</p>
        </div>
        <h3>
          Stock: <span>{{ product.master.stock }}</span>
        </h3>
        <div class="buying-tools">
          <input type="number" placeholder="Number of Items" />
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  `,
})
export class ProductVisualizerComponent {
  @Input()
  product!: Product;
  @Input()
  shortenedContent: boolean = true;
  constructor() {}
}
