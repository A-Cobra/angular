import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../models/employee.interface';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss'],
})
export class UserCreationFormComponent {
  @Output()
  formEvent: EventEmitter<Employee> = new EventEmitter<Employee>();
  editing: boolean = false;
  passwordConfirmation: string = '';
  countryList: string[] = ['spain'];
  stateList: string[] = ['Comunidad de Madrid'];
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  constructor() {}
  emitUpdateNotification() {
    console.log('Sending Edit Notification');
    // this.formEvent.emit(this.currentEmployee);
  }
  resetState() {
    this.currentEmployee.address.state = 'none';
  }
  clg(event: any) {
    console.log(event);
    console.log(this.currentEmployee?.birthDate);
  }
}
