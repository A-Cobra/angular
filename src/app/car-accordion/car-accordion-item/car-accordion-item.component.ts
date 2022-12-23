import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarSpecs } from 'src/app/model/car-specs.interface';

@Component({
  selector: 'app-car-accordion-item',
  templateUrl: './car-accordion-item.component.html',
  styleUrls: ['./car-accordion-item.component.scss'],
})
export class CarAccordionItemComponent {
  @Input()
  category: string = '';
  @Input()
  carsList: Array<CarSpecs> = [];
  @Input()
  collapsed: boolean = true;
  @Output()
  headerClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  notifyCollapsedStatusChange() {
    this.headerClick.emit(this.category);
  }
}
