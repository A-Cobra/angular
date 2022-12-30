import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  employeeList: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    console.log('Inside oninit');
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employeeList = employees;
      },
      error: err => {
        console.log('error');
        console.log(err);
        this.employeeList = [];
      },
    });
    // this.employeeService.getEmployees().subscribe({
    //   next: (employees: Employee[]) => {
    //     // this.employeeList = employees;
    //   },
    //   error: err => {
    //     console.log('error');
    //     console.log(err);
    //     this.employeeList = [];
    //   },
    // });
    console.log('this.employeeList');
    console.log(this.employeeList);
  }
}
