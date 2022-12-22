import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-accordion-item',
  templateUrl: './car-accordion-item.component.html',
  styleUrls: ['./car-accordion-item.component.scss'],
})
export class CarAccordionItemComponent {
  @Input() category: string = '';
  @Input() carsList: Array<any> = []; //NOT ANY KEYWORD
  @Input() collapsed: boolean = true; //NOT ANY KEYWORD
  constructor() {}
}
