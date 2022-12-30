import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Employee } from '../../models/employee.interface';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = defaultEmployee;
  employeesList: Employee[] = [
    {
      id: 0,
      firstName: 'Schneizel',
      lastName: 'Ramperouge',
      email: 'schneizel@applaudo.com',
      password: 'anypass',
      profileImage: '',
      birthDate: '1984-02-31',
      phone: 0,
      personalSiteUrl: '',
      about: '',
      gender: 'male',
      address: {
        country: 'none',
        state: 'none',
      },
    },
    {
      id: 1,
      firstName: 'Schneizel1',
      lastName: 'Ramperouge1',
      email: 'schneizel@applaudo.com',
      password: 'anypass',
      profileImage: '',
      birthDate: '1984-02-31',
      phone: 0,
      personalSiteUrl: '',
      about: '',
      gender: 'male',
      address: {
        country: 'none',
        state: 'none',
      },
    },
    {
      id: 2,
      firstName: 'Schneizel2',
      lastName: 'Ramperouge2',
      email: 'schneizel@applaudo.com',
      password: 'anypass',
      profileImage: '',
      birthDate: '1984-02-31',
      phone: 0,
      personalSiteUrl: '',
      about: '',
      gender: 'male',
      address: {
        country: 'none',
        state: 'none',
      },
    },
    {
      id: 3,
      firstName: 'Schneizel3',
      lastName: 'Ramperouge3',
      email: 'schneizel@applaudo.com',
      password: 'anypass',
      profileImage: '',
      birthDate: '1984-02-31',
      phone: 0,
      personalSiteUrl: '',
      about: '',
      gender: 'male',
      address: {
        country: 'none',
        state: 'none',
      },
    },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    console.log('OK');
    this.route.params.subscribe((data: Params) => {
      console.log(data);
      if (data?.['id'] < this.employeesList.length) {
        this.employee = this.employeesList[data?.['id']];
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
