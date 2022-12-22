import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  accordionComponent!: Array<any>; //Change this to not any
  title = 'AccordionApp';
  constructor() {
    this.accordionComponent = [
      {
        category: 'Croatian',
        collapsed: true,
      },
    ];
  }
}
