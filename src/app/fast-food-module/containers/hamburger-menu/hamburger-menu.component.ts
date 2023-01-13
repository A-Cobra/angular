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
  // constructor() {}
  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.menuService.getMenu().subscribe((menu: MenuItem[]) => {
      this.burgerMenu = menu;
    });
    console.log('object');
    console.log(this.menuService.menuPath);
  }
}
