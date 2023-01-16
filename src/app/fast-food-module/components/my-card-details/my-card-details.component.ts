import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-card-details',
  styleUrls: ['./my-card-details.component.scss'],
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="app-menu-selection-header"></ng-content>
      </div>
      <div [hidden]="collapsed" class="card-content">
        <ng-content select="app-menu-selection-content"></ng-content>
        <ng-content select="app-cart-selection-content"></ng-content>
      </div>
    </div>
  `,
})
export class MyCardDetailsComponent {
  @Input()
  collapsed: boolean = true;
  constructor() {}
}
