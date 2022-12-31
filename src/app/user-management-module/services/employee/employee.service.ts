import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    console.log('Getting number of Employees');
    return this.http
      .get<Employee[]>(`${this.localDatabase}/${this.baseUrl}`)
      .pipe(
        map(data => {
          if (data.length > 0) {
            return data[data.length - 1].id + 1;
          }
          return 1;
        })
      );
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
      employee.email === '' ||
      employee.password === '' ||
      employee.birthDate === '' ||
      employee.phone < 0 ||
      employee.gender === 'none' ||
      employee.address.country === 'none' ||
      employee.address.state === 'none'
    ) {
      return false;
    }
    return true;
  }
}
