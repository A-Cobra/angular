import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.interface';
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
  constructor(private router: Router) {}
  redirectToUserEdition() {
    console.log(this.currentEmployee.id);
    this.router.navigate(['/edit', `${this.currentEmployee.id}`]);
  }
  deleteAndRedirectToEmployeeDashboard() {
    console.log('deleting');
    this.router.navigate(['']);
  }
}
