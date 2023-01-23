import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="['/grocery-store']"
            [routerLinkActiveOptions]="{ exact: true }"
            >Log In</a
          >
          <a
            routerLinkActive="active"
            [routerLink]="['/grocery-store/home/all-products']"
            >All products</a
          >
          <a
            routerLinkActive="active"
            [routerLink]="['/grocery-store/home/cart']"
            >Cart</a
          >
          <a (click)="logOut()">Log Out</a>
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logOut() {
    console.log('Removing token');
    this.localStorageService.removeLoginToken();
    this.router.navigate(['grocery-store']);
  }
}
