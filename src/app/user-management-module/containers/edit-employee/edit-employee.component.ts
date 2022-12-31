import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { FormEvent } from '../../models/form-event.type';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  successfulUpdate: boolean = false;
  queryError = false;
  endAllSubscriptions$: Subject<string> = new Subject<string>();
  employee: Employee = Object.assign({}, defaultEmployee);
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
    this.endAllSubscriptions$.unsubscribe();
  }
  onHandleEvent(formEvent: FormEvent) {
    console.log('On handle Event');
    if (formEvent.type === 'update') {
      console.log('Updating');
      const validation = this.employeeService.validateEmployee(
        formEvent.employee
      );
      console.log('validation');
      console.log(validation);
      if (validation) {
        console.log('Correct Navigation');
        this.employeeService
          .updateEmployee(formEvent.employee)
          .pipe(take(1))
          .subscribe({
            next: (employee: Employee) => {
              console.log('Success');
              this.successfulUpdate = true;
              setTimeout(() => {
                this.router.navigate(['']);
              }, 2500);
            },
            error: err => {
              console.log('Failure');
            },
          });
      }
    }
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
