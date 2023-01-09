import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { UserFormAppComponent } from './containers/user-form-app/user-form-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberFormatDirective } from './directives/number-format/number-format.directive';

@NgModule({
  declarations: [UserFormAppComponent, FormComponent, NumberFormatDirective],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [UserFormAppComponent],
})
export class UserFormModule {}
