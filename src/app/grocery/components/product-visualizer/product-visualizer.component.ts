import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

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
        <input type="number" placeholder="Number of Items" />
        <button>Add to cart</button>
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

  imgUrl(blobUrl: Blob): string {
    return URL.createObjectURL(blobUrl);
  }
}
