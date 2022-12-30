import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreationFormComponent } from './components/user-creation-form/user-creation-form.component';
import { EditEmployeeComponent } from './containers/edit-employee/edit-employee.component';
import { EmployeeDashboardComponent } from './containers/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeDashboardComponent },
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
  { path: 'employee', component: EditEmployeeComponent },
  { path: 'edit', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
