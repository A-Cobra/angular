import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <a
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['hamburger-combos']
                }
              }
            ]"
            >Hamburger Combos</a
          >
          <a
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['pizza-combos']
                }
              }
            ]"
            >Pizza Combos</a
          >
          <a
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['desserts']
                }
              }
            ]"
            >Desserts</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent {
  constructor() {}
}
