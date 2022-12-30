import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './user-management-module/components/navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './user-management-module/components/not-found/not-found.component';
import { UserCreationFormComponent } from './user-management-module/components/user-creation-form/user-creation-form.component';
import { EmployeeDashboardComponent } from './user-management-module/containers/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
