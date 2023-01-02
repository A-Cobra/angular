import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MyValidations } from '../../directives/form-validations.directive';
import { Employee } from '../../models/employee.interface';
import { defaultEmployee } from '../../utils/default-employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  localDatabase = environment.localDatabase;
  baseUrl = 'employees';
  numberOfEmployees: number = 0;
  constructor(private http: HttpClient) {}
  getNumberOfEmployees() {
    console.log('Getting number of Employees');
    return this.http
      .get<Employee[]>(`${this.localDatabase}/${this.baseUrl}`)
      .pipe(
        catchError(error => of([])),
        map(data => {
          if (data.length > 0) {
            return data[data.length - 1].id + 1;
          }
          return 1;
        })
      );
  }
  getEmployees() {
    return this.http.get<Employee[]>(`${this.localDatabase}/${this.baseUrl}`);
  }
  getSingleEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.localDatabase}/${this.baseUrl}/${id}`
    );
    // .pipe(catchError(error => of(defaultEmployee)));
  }
  createEmployee(employee: Employee) {
    return this.http.post<Employee>(
      `${this.localDatabase}/${this.baseUrl}`,
      employee
    );
  }
  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(
      `${this.localDatabase}/${this.baseUrl}/${employee.id}`,
      employee
    );
  }
  deleteEmployee(employee: Employee) {
    return this.http.delete<Employee>(
      `${this.localDatabase}/${this.baseUrl}/${employee.id}`
    );
  }
  validateEmployee(employee: Employee): boolean {
    if (
      employee.firstName.length < 4 ||
      employee.firstName.length > 15 ||
      employee.lastName.length < 4 ||
      employee.lastName.length > 15 ||
      (!employee.email.includes('@') && !employee.email.includes('.')) ||
      employee.email.slice(-1) === '.' ||
      !MyValidations.passwordStrength(employee.password) ||
      employee.birthDate === '' ||
      employee.birthDate > new Date().toISOString().split('T')[0] ||
      (employee.phone < 0 && employee.phone.toString().length < 4) ||
      employee.gender === 'none' ||
      employee.address.country === 'none' ||
      employee.address.state === 'none'
    ) {
      return false;
    }
    return true;
  }
}
