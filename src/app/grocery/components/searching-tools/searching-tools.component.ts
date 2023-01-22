import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.interface';

@Component({
  selector: 'app-searching-tools',
  styleUrls: ['./searching-tools.component.scss'],
  template: `
    <div>
      <select name="category-selector" id="category-selector">
        <option value="all">All</option>
        <option *ngFor="let category of categories" [value]="category.slug">
          {{ category.name }}
        </option>
      </select>
    </div>
  `,
})
export class SearchingToolsComponent {
  @Input()
  categories: ProductCategory[] = [];
  constructor() {}
}
