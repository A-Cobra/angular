import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreationFormComponent } from './components/user-creation-form/user-creation-form.component';
import { CreateEmployeeComponent } from './containers/create-employee/create-employee.component';
import { EditEmployeeComponent } from './containers/edit-employee/edit-employee.component';
import { EmployeeDashboardComponent } from './containers/employee-dashboard/employee-dashboard.component';
import { SingleEmployeeComponent } from './containers/single-employee/single-employee.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeDashboardComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'view-employee/:id', component: SingleEmployeeComponent },
  {
    path: 'edit',
    children: [
      {
        path: '',
        component: UserCreationFormComponent,
      },
      {
        path: ':id',
        component: EditEmployeeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
