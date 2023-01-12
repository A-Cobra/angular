import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';

const routes: Routes = [
  {
    path: '',
    component: FastFoodAppComponent,
    children: [
      {
        path: 'hamburger-combos',
        children: [
          {
            path: 'selection',
            outlet: 'menu-selection',
            component: MyCardDetailsComponent,
          },
          {
            path: 'details',
            outlet: 'menu-details',
            component: MyCardDetailsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastFoodRoutingModule {}
