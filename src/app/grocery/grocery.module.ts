import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent, NavigationBarComponent],
  imports: [CommonModule, GroceryRoutingModule, ReactiveFormsModule],
  providers: [],
})
export class GroceryModule {}
