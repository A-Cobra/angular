import { Component } from '@angular/core';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss'],
})
export class UserCreationFormComponent {
  editing: boolean = false;
  passwordConfirmation: string = '';
  currentEmployee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    phone: 0,
    personalSiteUrl: '',
    about: '',
    gender: 'male',
    address: {
      country: 'none',
      state: 'none',
    },
  };
  constructor() {}
}
