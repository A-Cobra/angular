import { Component, Input, OnInit } from '@angular/core';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';

@Component({
  selector: 'app-menu-selection-header',
  template: `
    <div>
      <section class="flex-container">
        <div *ngIf="menuItem.image" class="img-container">
          <img [src]="menuItem.image" [alt]="menuItem.name" />
        </div>
        <article>
          <div class="text">
            <div class="main-info">
              <h3>{{ menuItem.name }}</h3>
              <p>
                Base price:
                <span>{{
                  menuItem.basePrice | currency : 'USD' : 'symbol' : '1.2-2'
                }}</span>
              </p>
            </div>
            <div class="description">{{ menuItem.description }}</div>
          </div>
          <div class="icon">
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </article>
      </section>
    </div>
  `,
  styleUrls: ['./menu-selection-header.component.scss'],
})
export class MenuSelectionHeaderComponent {
  @Input()
  menuItem: MenuItem = { ...defaultMenuSelection };
  constructor() {}
}
