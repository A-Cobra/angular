import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewChecked,
  ElementRef,
  Input,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { defaultMenuSelection } from 'src/app/utils/default-menu-selection';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-hamburger-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
// implements OnInit, OnDestroy, AfterViewInit
export class ItemDetailsComponent implements OnInit {
  selectedId!: number;
  currentMenuSelection: MenuItem = { ...defaultMenuSelection };
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  @ViewChild('detailsContent', { read: ViewContainerRef })
  detailsDiv!: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        this.selectedId = parseInt(urlData?.['id']);
        this.menuService.getMenuItem(urlData?.['id']).subscribe({
          next: (menuSelection: MenuItem) => {
            this.currentMenuSelection = menuSelection;
          },
          complete: () => {
            this.detailsDiv.clear();
            const formComponent =
              this.detailsDiv.createComponent(OrderFormComponent);
            formComponent.instance.id = this.selectedId;
            formComponent.instance.currentMenuSelection =
              this.currentMenuSelection;
          },
        });
      });
  }
}
