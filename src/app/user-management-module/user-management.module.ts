import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [UserManagementComponent, NavigationBarComponent],
  imports: [CommonModule],
  exports: [UserManagementComponent],
})
export class UserManagementModule {}
