import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-hamburger-details',
  templateUrl: './hamburger-details.component.html',
  styleUrls: ['./hamburger-details.component.scss'],
})
export class HamburgerDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  selectedId!: number;
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  @ViewChild('detailsContent', { read: ViewContainerRef })
  detailsDiv!: ViewContainerRef;
  // @ViewChild('detailsContent') detailsDiv!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}
  ngAfterViewInit(): void {
    const component = this.detailsDiv.createComponent(OrderFormComponent);
    component.instance.id = this.selectedId;
    console.log('this.detailsDiv');
    console.log(this.detailsDiv);
  }
  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        console.log(urlData);
        this.selectedId = parseInt(urlData?.['id']);
        this.menuService.getMenuItem(urlData?.['id']).subscribe({
          next: (menuSelection: MenuItem) => {
            this.currentMenuSelection = menuSelection;
            console.log(this.currentMenuSelection);
          },
          error: err => {
            console.log(err);
          },
        });
      });
  }
}
