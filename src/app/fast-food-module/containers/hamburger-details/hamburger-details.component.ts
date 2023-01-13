import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-hamburger-details',
  templateUrl: './hamburger-details.component.html',
  styleUrls: ['./hamburger-details.component.scss'],
})
export class HamburgerDetailsComponent implements OnInit, OnDestroy {
  id!: number;
  currentMenuSelection!: MenuItem;
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}
  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((urlData: Params) => {
        console.log(urlData);
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
