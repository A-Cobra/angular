import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  localDatabase = environment.localDatabase;
  baseUrl = 'employees';
  numberOfEmployees: number = 0;
  constructor(private http: HttpClient) {}
  getNumberOfEmployees() {
    // fetch()
  }
  getEmployees() {
    console.log('Getting Employees');
    console.log(`${this.localDatabase}/${this.baseUrl}`);
    return this.http.get<Employee[]>(`${this.localDatabase}/${this.baseUrl}`);
    // return this.http
    //   .get<Employee[]>(`${this.localDatabase}/${this.baseUrl}`)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }
  getSingleEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.localDatabase}/${this.baseUrl}/${id}`
    );
  }
  validateEmployee(employee: Employee): boolean {
    if (
      employee.firstName === '' ||
      employee.lastName === '' ||
      employee.lastName === '' ||
      employee.lastName === ''
    ) {
      return false;
    }
    return true;
  }
}
