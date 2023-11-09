import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { FormEvent } from '../../models/form-event.type';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  creationError = false;
  successfulCreation = false;
  employee: Employee = Object.assign({}, defaultEmployee);
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.setCreationId();
  }
  onHandleEvent(formEvent: FormEvent) {
    if (formEvent.type === 'create') {
      const validation = this.employeeService.validateEmployee(
        formEvent.employee
      );
      if (validation) {
        this.employeeService
          .createEmployee(formEvent.employee)
          .pipe(take(1))
          .subscribe({
            next: (employee: Employee) => {
              this.resetEmployeeData();
              this.successfulCreation = true;
              setTimeout(() => {
                this.redirectTo('create-employee');
              }, 2500);
              this.setCreationId();
            },
            error: err => {
              console.log('Failure in the creation process at the API');
            },
          });
      } else {
        scrollTo(0, 0);
        this.creationError = true;
        setTimeout(() => {
          this.creationError = false;
        }, 2500);
      }
    }
  }
  setCreationId() {
    this.employeeService
      .getNumberOfEmployees()
      .pipe(take(1))
      .subscribe(newId => (this.employee.id = newId));
  }
  resetEmployeeData() {
    this.employee = Object.assign({}, defaultEmployee);
  }
  redirectTo(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
