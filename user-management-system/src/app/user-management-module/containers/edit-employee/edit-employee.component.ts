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
  updateError: boolean = false;
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
    if (formEvent.type === 'update') {
      const validation = this.employeeService.validateEmployee(
        formEvent.employee
      );
      if (validation) {
        this.employeeService
          .updateEmployee(formEvent.employee)
          .pipe(take(1))
          .subscribe({
            next: (employee: Employee) => {
              this.successfulUpdate = true;
              setTimeout(() => {
                this.router.navigate(['']);
              }, 2500);
            },
            error: err => {
              console.log('Error updating the Employee');
            },
          });
      } else {
        scrollTo(0, 0);
        this.updateError = true;
        setTimeout(() => {
          this.updateError = false;
        }, 2500);
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
