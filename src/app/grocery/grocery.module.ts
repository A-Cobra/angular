import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, GroceryRoutingModule],
  providers: [],
})
export class GroceryModule {}
