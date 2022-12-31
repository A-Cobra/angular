import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.interface';
import { FormEvent } from '../../models/form-event.type';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss'],
})
export class UserCreationFormComponent {
  @Output()
  formEvent: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  @Input()
  editing: boolean = false;
  @Input()
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  passwordConfirmation: string = '';
  countryList: string[] = ['spain'];
  stateList: string[] = ['Comunidad de Madrid'];
  constructor() {}
  emitUpdateNotification() {
    // console.log('Sending Edit Notification');
    this.formEvent.emit({
      employee: this.currentEmployee,
      type: 'update',
    });
  }
  emitCreationNotification() {
    // console.log('Sending Edit Notification');
    this.formEvent.emit({
      employee: this.currentEmployee,
      type: 'create',
    });
  }
  resetState() {
    this.currentEmployee.address.state = 'none';
  }
  clg(event: any) {
    console.log('event');
    console.log(event);
    console.log(this.currentEmployee?.birthDate);
  }
  getNumberOfDigits(originalNumber: number): number {
    let numberOfDigits: number;
    if (originalNumber === 0) {
      numberOfDigits = 1;
    } else if (originalNumber < 0) {
      numberOfDigits = 0;
    } else {
      numberOfDigits = Math.round(Math.log10(originalNumber)) + 2;
    }
    return numberOfDigits;
  }
  containsCertainChar(string: string, char: string) {
    return string.includes(char);
  }
}
