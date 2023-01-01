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
import { EmployeeDashboardComponent } from './containers/employee-dashboard/employee-dashboard.component';
import { EmployeeViewerComponent } from './components/employee-viewer/employee-viewer.component';
import { CreateEmployeeComponent } from './containers/create-employee/create-employee.component';
import { SingleEmployeeComponent } from './containers/single-employee/single-employee.component';
import { PasswordStrengthDirective } from './directives/form-validators/password-strength.directive';
import { MyValidations } from './directives/form-validations.directive';

@NgModule({
  declarations: [
    UserManagementComponent,
    NavigationBarComponent,
    UserCreationFormComponent,
    NotFoundComponent,
    EditEmployeeComponent,
    EmployeeDashboardComponent,
    EmployeeViewerComponent,
    CreateEmployeeComponent,
    SingleEmployeeComponent,
    PasswordStrengthDirective,
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
