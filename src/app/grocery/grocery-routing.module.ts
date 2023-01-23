import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './containers/all-products/all-products.component';
import { CartComponent } from './containers/cart/cart.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'all-products', component: AllProductsComponent },
      { path: 'all-products/:productSlug', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceryRoutingModule {}
