import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';

@Component({
  selector: 'app-menu-selection-header',
  styleUrls: ['./menu-selection-header.component.scss'],
  template: `
    <div class="menu-selection-header-container">
      <!-- <header *ngIf="cartHeader" class="flex">
        <h3>
          Total Price:
          <span>{{ totalPrice | currency : 'USD' : 'symbol' : '1.2-2' }}</span>
        </h3>
        <button (click)="onCompleteOrder()">Add to cart</button>
      </header> -->
      <section class="flex-container">
        <div *ngIf="menuItem.image" class="img-container">
          <img [src]="menuItem.image" [alt]="menuItem.name" />
        </div>
        <article>
          <div class="text">
            <div class="main-info">
              <h3>{{ menuItem.name }}</h3>
              <p *ngIf="cartHeader; else basePrice">
                Partial Price:
                <span>
                  {{ totalPrice | currency : 'USD' : 'symbol' : '1.2-2' }}
                </span>
              </p>
              <ng-template #basePrice>
                <p>
                  Base price:
                  <span>{{
                    menuItem.basePrice | currency : 'USD' : 'symbol' : '1.2-2'
                  }}</span>
                </p>
              </ng-template>
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
})
export class MenuSelectionHeaderComponent {
  @Input()
  totalPrice: number = 0;
  @Input()
  cartHeader: boolean = false;
  @Input()
  menuItem: MenuItem = { ...defaultMenuSelection };
  constructor(private changeDetector: ChangeDetectorRef) {}

  // ngAfterViewInit(): void {
  //   this.calculatePrice();
  //   this.changeDetector.detectChanges();
  // }

  calculatePrice() {
    console.log('Recalculating price');
    let recalculatedPrice = this.menuItem.basePrice;
    console.log('recalculatedPrice base price');
    console.log(recalculatedPrice);
    for (const customizableOption of this.menuItem.customizableOptions) {
      if (customizableOption?.options) {
        for (const option of customizableOption?.options) {
          if (option.selected) {
            recalculatedPrice += option.extraPrice ?? 0;
          }
        }
      }
    }
    this.totalPrice = recalculatedPrice;
  }

  onCompleteOrder() {
    console.log('Order added');
  }
}
