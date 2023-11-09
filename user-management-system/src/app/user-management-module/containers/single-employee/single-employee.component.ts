import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent implements OnInit, OnDestroy {
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
  redirectTo(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
