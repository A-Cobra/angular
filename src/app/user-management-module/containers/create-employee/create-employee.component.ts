import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = Object.assign({}, defaultEmployee);
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.employeeService
      .getNumberOfEmployees()
      .pipe(take(1))
      .subscribe(newId => (this.employee.id = newId));
  }
}
