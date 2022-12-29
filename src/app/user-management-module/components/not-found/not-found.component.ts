import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1>Sorry, the resource you've been searching for, doesn't exist</h1>
    <a routerLink="">Go Home</a>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
