import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  styleUrls: ['./employee-viewer.component.scss'],
})
export class EmployeeViewerComponent {
  @Input()
  shortenedContent = false;
  @Input()
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  defaultManPicture: string =
    '../../../../assets/images/employee-profile/man.svg';
  defaultWomanPicture: string =
    '../../../../assets/images/employee-profile/woman.svg';
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}
  redirectToUserEdition() {
    console.log(this.currentEmployee.id);
    this.router.navigate(['/edit', `${this.currentEmployee.id}`]);
  }
  deleteAndRedirectToEmployeeDashboard() {
    console.log('deleting');
    this.employeeService
      .deleteEmployee(this.currentEmployee)
      .pipe(take(1))
      .subscribe({
        next: (employee: Employee) => {
          console.log('Success');
          setTimeout(() => {
            this.redirectTo('');
          }, 2500);
        },
        error: err => {
          console.log('Failure');
        },
      });
  }
  redirectTo(url: string) {
    this.router
      .navigateByUrl('/not-found', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([url]);
      });
  }
}
