import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ProductCategory } from 'src/app/models/product/product-category.interface';
import { SearchToolsEvent } from 'src/app/models/search-tools-event.type';
import { debounce } from 'src/app/utils/debounce';

@Component({
  selector: 'app-searching-tools',
  styleUrls: ['./searching-tools.component.scss'],
  template: `
    <div class="flex-wrap">
      <div class="form-control flex-container">
        <label class="description" for="category-selector"
          >Search by Category</label
        >
        <select
          #category
          (change)="onSearchToolsUsage()"
          name="category-selector"
          id="category-selector">
          <option value="">All</option>
          <option *ngFor="let category of categories" [value]="category.slug">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-control flex-container">
        <label class="description" for="searchInput">Search by Name</label>
        <input
          #productNameInput
          (input)="debounceInput()"
          type="text"
          id="searchInput"
          placeholder="search by name" />
      </div>
    </div>
  `,
})
export class SearchingToolsComponent {
  @Input()
  categories: ProductCategory[] = [];
  @Output()
  searchingToolsUsage: EventEmitter<SearchToolsEvent> =
    new EventEmitter<SearchToolsEvent>();
  @ViewChild('category') categorySelector!: ElementRef;
  @ViewChild('productNameInput') productNameInput!: ElementRef;

  constructor() {}

  onSearchToolsUsage() {
    this.searchingToolsUsage.emit({
      category: this.categorySelector.nativeElement.value,
      nameQuery: this.productNameInput.nativeElement.value,
    });
  }

  debounceInput: Function = debounce(() => {
    this.onSearchToolsUsage();
  });
}
