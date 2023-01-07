import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { UserFormAppComponent } from './containers/user-form-app/user-form-app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserFormAppComponent],
  imports: [CommonModule, UserFormRoutingModule, ReactiveFormsModule],
  exports: [UserFormAppComponent],
})
export class UserFormModule {}
