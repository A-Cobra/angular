import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  queryError = false;
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  employee: Employee = defaultEmployee;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.endAllSubscriptions$))
      .subscribe((data: Params) => {
        this.employeeService
          .getSingleEmployee(data?.['id'])
          .pipe(take(1))
          .subscribe({
            next: (employee: Employee) => {
              this.employee = employee;
            },
            error: err => {
              console.log(err);
              this.queryError = true;
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 3000);
            },
          });
      });
  }
  ngOnDestroy(): void {
    this.endAllSubscriptions$.next('');
  }
}
