import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailsPlaceholderComponent } from './components/menu-details-placeholder/menu-details-placeholder.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { DessertsComponent } from './containers/desserts/desserts.component';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { HamburgerDetailsComponent } from './containers/hamburger-details/hamburger-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';
import { PizzaMenuComponent } from './containers/pizza-menu/pizza-menu.component';

const routes: Routes = [
  {
    path: '',
    component: FastFoodAppComponent,
    children: [
      // Main Outlet
      {
        path: 'hamburger-combos',
        outlet: 'menu-selection',
        component: HamburgerMenuComponent,
      },
      {
        path: 'pizza-combos',
        outlet: 'menu-selection',
        component: PizzaMenuComponent,
      },
      {
        path: 'desserts',
        outlet: 'menu-selection',
        component: DessertsComponent,
      },
      // Secondary Outlet
      {
        path: 'burger-combo/:id',
        outlet: 'menu-details',
        component: HamburgerDetailsComponent,
      },
      {
        path: 'selection',
        outlet: 'menu-details',
        component: MenuDetailsPlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastFoodRoutingModule {}
