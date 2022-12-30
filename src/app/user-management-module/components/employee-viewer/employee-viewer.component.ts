import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.interface';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  styleUrls: ['./employee-viewer.component.scss'],
})
export class EmployeeViewerComponent {
  defaultManPicture: string =
    '../../../../assets/images/employee-profile/man.svg';
  defaultWomanPicture: string =
    '../../../../assets/images/employee-profile/woman.svg';
  @Input()
  shortenedContent = false;
  @Input()
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  constructor() {}
}
