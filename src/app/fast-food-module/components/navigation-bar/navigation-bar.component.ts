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
            routerLinkActive="active"
            [routerLink]="[
              '/fast-food',
              {
                outlets: {
                  'menu-selection': ['hamburger-combos'],
                  'menu-details': ['selection']
                }
              }
            ]"
            >Hamburger Combos</a
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
            >Pizza Combos</a
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
