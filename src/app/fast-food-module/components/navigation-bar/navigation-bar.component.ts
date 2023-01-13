import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <!-- <a
            [routerLink]="['/hamburger-combos', outlets:{
            'menu-selection': ['/selection'],
          }]"
            >Hamburger Combos</a -->
          <!-- <a
            [routerLink]="[
              'hamburger-combos',
              {
                outlets: {
                  'menu-selection': ['/selection'],
                  'details-selection': ['/details']
                }
              }
            ]"
            >Hamburger Combos</a
          > -->
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
          <!-- <a [routerLink]="['hamburger-combos']">Hamburger Combos</a> -->
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent {
  constructor() {}
}
