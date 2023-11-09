import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details-placeholder',
  styleUrls: ['./cart-details-placeholder.component.scss'],
  template: `
    <div>
      <h2>Please Select the item you want to edit or remove...</h2>
    </div>
  `,
})
export class CartDetailsPlaceholderComponent {
  constructor() {}
}
