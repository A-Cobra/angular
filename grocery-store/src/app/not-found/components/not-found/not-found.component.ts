import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.scss'],
  template: `
    <div>
      <h1 class="error">Error 404</h1>
      <h2>The resource you are looking for, doesn't exist</h2>
      <a (click)="goHome()">Go home</a>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['grocery-store', 'home', 'all-products']);
  }
}
