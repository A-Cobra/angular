import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { UserFormAppComponent } from './containers/user-form-app/user-form-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserFormAppComponent, FormComponent],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [UserFormAppComponent],
})
export class UserFormModule {}
