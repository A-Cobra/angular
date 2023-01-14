import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-card-details',
  styleUrls: ['./my-card-details.component.scss'],
  template: `
    <div class="card" (click)="onChangeCollapsedStatus()">
      <div class="card-header">
        <ng-content select="app-menu-selection-header"></ng-content>
      </div>
      <div [hidden]="collapsed" class="card-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil sed
        eaque, officia exercitationem quisquam necessitatibus. Esse doloremque,
        deserunt vero ratione laborum doloribus, recusandae sed numquam corrupti
        quae iste atque?
      </div>
    </div>
  `,
})
export class MyCardDetailsComponent {
  @Input()
  collapsed: boolean = true;
  constructor() {}
  onChangeCollapsedStatus() {
    this.collapsed = !this.collapsed;
  }
}
