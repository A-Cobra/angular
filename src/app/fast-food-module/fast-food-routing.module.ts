import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { HamburgerDetailsComponent } from './containers/hamburger-details/hamburger-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';

const routes: Routes = [
  {
    path: '',
    component: FastFoodAppComponent,
    children: [
      {
        path: 'hamburger-combos',
        outlet: 'menu-selection',
        component: HamburgerMenuComponent,
        // children: [
        //   {
        //     path: 'burger',
        //     outlet: 'menu-details',
        //     component: MyCardDetailsComponent,
        //   },
        // ],
      },
      {
        path: 'burger-combo/:id',
        outlet: 'menu-details',
        component: HamburgerDetailsComponent,
      },
      // {
      //   path: 'hamburger-combos',
      //   children: [
      //     {
      //       path: 'selection',
      //       outlet: 'menu-selection',
      //       component: HamburgerMenuComponent,
      //     },
      //     {
      //       path: 'details',
      //       outlet: 'menu-details',
      //       component: MyCardDetailsComponent,
      //     },
      //   ],
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastFoodRoutingModule {}
