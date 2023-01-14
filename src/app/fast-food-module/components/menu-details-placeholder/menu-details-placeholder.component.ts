import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-details-placeholder',
  styleUrls: ['./menu-details-placeholder.component.scss'],
  template: `
    <div>
      <h2>Please Select the item you want to order...</h2>
    </div>
  `,
})
export class MenuDetailsPlaceholderComponent {
  constructor() {}
}
