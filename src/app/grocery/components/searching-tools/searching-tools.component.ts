import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.interface';

@Component({
  selector: 'app-searching-tools',
  styleUrls: ['./searching-tools.component.scss'],
  template: `
    <div>
      <select
        (change)="onCategoryChange($event)"
        name="category-selector"
        id="category-selector">
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
  onCategoryChange(
    // changeEvent: Event | { target: EventTarget  { value: string } }
    changeEvent: Event | { target: EventTarget }
    // changeEvent: Event
  ) {
    const eventTarget = <HTMLSelectElement>changeEvent.target;
    console.log(eventTarget.value);
  }
}
