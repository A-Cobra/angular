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
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  constructor() {}
  emitUpdateNotification() {
    console.log('Sending Edit Notification');
    // this.formEvent.emit(this.currentEmployee);
  }
}
