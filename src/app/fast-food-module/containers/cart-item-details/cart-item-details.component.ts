import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';
import { CartService } from '../../services/cart/cart.service';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-cart-item-details',
  templateUrl: './cart-item-details.component.html',
  styleUrls: ['./cart-item-details.component.scss'],
})
export class CartItemDetailsComponent implements OnInit {
  selectedId!: number;
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  @ViewChild('detailsContent', { read: ViewContainerRef })
  detailsDiv!: ViewContainerRef;
  @Input()
  cartForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        console.log(urlData);
        this.selectedId = parseInt(urlData?.['id']);
        this.cartService.getCartItem(urlData?.['id']).subscribe({
          next: (menuSelection: MenuItem) => {
            this.currentMenuSelection = menuSelection;
            console.log('this.currentMenuSelection');
            console.log(this.currentMenuSelection);
            console.log('CHANGING ROUTES FORM TEH HAMBURGER DETAILS');
          },
          error: err => {
            console.log(err);
          },
          complete: () => {
            // PUT IT HERE
            const formComponent =
              this.detailsDiv.createComponent(OrderFormComponent);
            formComponent.instance.id = this.selectedId;
            formComponent.instance.currentMenuSelection =
              this.currentMenuSelection;
            formComponent.instance.cartForm = true;
            console.log('formComponent.instance');
            console.log(formComponent.instance);
            console.log('COMPLETED');
            console.log('this.detailsDiv');
            console.log(this.detailsDiv);
          },
        });
      });
  }
}
