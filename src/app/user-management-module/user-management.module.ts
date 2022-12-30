import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserCreationFormComponent } from './components/user-creation-form/user-creation-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//Formulary
import { FormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './containers/edit-employee/edit-employee.component';
import { EmployeeService } from './services/employee/employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UserManagementComponent,
    NavigationBarComponent,
    UserCreationFormComponent,
    NotFoundComponent,
    EditEmployeeComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [UserManagementComponent, UserCreationFormComponent],
  providers: [EmployeeService],
})
export class UserManagementModule {}
