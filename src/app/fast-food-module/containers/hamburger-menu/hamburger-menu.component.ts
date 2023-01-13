import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  burgerMenu: MenuItem[] = [];
  category = 1;
  // constructor() {}
  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    // this.menuService.getMenu().subscribe((menu: MenuItem[]) => {
    //   this.burgerMenu = menu;
    // });
    this.menuService
      .getMenuByCategory(this.category)
      .subscribe((menu: MenuItem[]) => {
        this.burgerMenu = menu;
        console.log(this.burgerMenu);
      });
    console.log('object');
    console.log(this.menuService.menuPath);
  }
}
