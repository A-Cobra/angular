import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'grocery-store',
    loadChildren: () =>
      import('./grocery/grocery.module').then(m => m.GroceryModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../app/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
