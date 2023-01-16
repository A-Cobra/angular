import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details-placeholder',
  styleUrls: ['./order-details-placeholder.component.scss'],
  template: `
    <div>
      <h2>Please Select the order you want to review...</h2>
    </div>
  `,
})
export class OrderDetailsPlaceholderComponent {
  constructor() {}
}
