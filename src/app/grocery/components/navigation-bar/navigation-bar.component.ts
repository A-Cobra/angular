import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="['/grocery-store/home/all-products']"
            >All products</a
          >
          <a
            routerLinkActive="active"
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['pizza-combos'],
                  'menu-details': ['selection']
                }
              }
            ]"
            >Categories</a
          >
          <a
            routerLinkActive="active"
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['desserts'],
                  'menu-details': ['selection']
                }
              }
            ]"
            >Log Out</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent {
  constructor() {}
}
