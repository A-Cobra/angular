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
  constructor(private http: HttpClient) {}
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
  getSingleEmployee(id: string) {
    return this.http.get<Employee>(
      `${this.localDatabase}/${this.baseUrl}/${id}`
    );
  }
}
