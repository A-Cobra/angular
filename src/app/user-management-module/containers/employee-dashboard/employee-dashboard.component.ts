import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  employeeList: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    console.log('Inside oninit');
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe({
        next: (employees: Employee[]) => {
          this.employeeList = employees;
        },
        error: err => {
          console.log('error');
          console.log(err);
          this.employeeList = [];
        },
      });
  }
  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
    this.endAllSubscriptions$.unsubscribe();
  }
}
