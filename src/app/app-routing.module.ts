import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:
      '/fast-food/(menu-selection:hamburger-combos//menu-details:selection)',
    pathMatch: 'full',
  },
  {
    path: 'fast-food',
    loadChildren: () =>
      import('./fast-food-module/fast-food.module').then(m => m.FastFoodModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
