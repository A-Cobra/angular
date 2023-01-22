import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.interface';
import { SearchToolsEvent } from 'src/app/models/search-tools-event.type';
import { debounce } from 'src/app/utils/debounce';

@Component({
  selector: 'app-searching-tools',
  styleUrls: ['./searching-tools.component.scss'],
  template: `
    <div>
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
      <input
        #productNameInput
        (input)="debounceInput()"
        type="text"
        placeholder="search by name" />
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
    console.log('this.categorySelector.nativeElement.value');
    console.log(this.categorySelector.nativeElement.value);
    console.log('this.productNameInput.nativeElement.value');
    console.log(this.productNameInput.nativeElement.value);
    this.searchingToolsUsage.emit({
      category: this.categorySelector.nativeElement.value,
      nameQuery: this.productNameInput.nativeElement.value,
    });
  }

  debounceInput: Function = debounce(() => {
    this.onSearchToolsUsage();
  });
}
