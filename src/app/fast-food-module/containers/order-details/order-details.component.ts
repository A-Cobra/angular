import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../models/menu-item.interface';
import { Order } from '../../models/order.type';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  selectedOrder!: Order;
  selectedId!: number;
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  totalItemsPrice: number[] = [];
  // @ViewChild('detailsContent', { read: ViewContainerRef })
  // detailsDiv!: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        console.log(urlData);
        this.selectedId = parseInt(urlData?.['id']);
        this.orderService.getOrderById(urlData?.['id']).subscribe({
          next: (order: Order) => {
            this.selectedOrder = order;
          },
          error: err => {
            console.log(err);
          },
          complete: () => {
            this.selectedOrder.orderItems.forEach((cartMenuItem: MenuItem) => {
              this.totalItemsPrice.push(this.calculatePrice(cartMenuItem));
            });
            // PUT IT HERE
            // this.detailsDiv.clear();
            // const formComponent =
            //   this.detailsDiv.createComponent(OrderFormComponent);
            // formComponent.instance.id = this.selectedId;
            // formComponent.instance.currentMenuSelection =
            //   this.currentMenuSelection;
            // console.log('formComponent.instance');
            // console.log(formComponent.instance);
            // console.log('COMPLETED');
            // console.log('this.detailsDiv');
            // console.log(this.detailsDiv);
          },
        });
      });
  }

  calculatePrice(menuItem: MenuItem) {
    console.log('Recalculating price');
    let recalculatedPrice = menuItem.basePrice;
    console.log('recalculatedPrice base price');
    console.log(recalculatedPrice);
    for (const customizableOption of menuItem.customizableOptions) {
      if (customizableOption?.options) {
        for (const option of customizableOption?.options) {
          if (option.selected) {
            recalculatedPrice += option.extraPrice ?? 0;
          }
        }
      }
    }
    return recalculatedPrice;
  }

  onMakeSameOrder() {
    console.log('Making the same order');
  }
}
