import { VariableBinding } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { MyValidations } from '../../directives/form-validations.directive';
import { Employee } from '../../models/employee.interface';
import { FormEvent } from '../../models/form-event.type';
import { CountriesFetcherService } from '../../services/country-fetcher/countries-fetcher.service';
import { defaultEmployee } from '../../utils/default-employee';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss'],
})
export class UserCreationFormComponent implements OnInit {
  @Output()
  formEvent: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  @Input()
  editing: boolean = false;
  @Input()
  currentEmployee: Employee = Object.assign({}, defaultEmployee);
  passwordConfirmation: string = '';
  countryList: string[] = [];
  stateList: string[] = [];
  constructor(private countryService: CountriesFetcherService) {}
  ngOnInit(): void {
    this.countryService
      .getCountries()
      .pipe(take(1))
      .subscribe({
        next: (countriesArray: any) => {
          console.log(countriesArray);
          this.countryList = countriesArray;
        },
        error: (error: any) => {
          console.log('error');
          console.log(error);
        },
      });
  }
  emitUpdateNotification() {
    if (this.passwordConfirmation === this.currentEmployee.password) {
      this.formEvent.emit({
        employee: this.currentEmployee,
        type: 'update',
      });
    }
  }
  emitCreationNotification() {
    console.log('Passworfd Strength checking');
    console.log(this.currentEmployee.password);
    console.log(MyValidations.passwordStrength(this.currentEmployee.password));
    if (this.passwordConfirmation === this.currentEmployee.password) {
      this.formEvent.emit({
        employee: this.currentEmployee,
        type: 'create',
      });
    }
  }
  changeStateList(country: string) {
    if (country !== 'none') {
      this.countryService
        .getStates(country)
        .pipe(take(1))
        .subscribe({
          next: (statesArray: any) => {
            this.stateList = statesArray;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else {
      this.currentEmployee.address.state = 'none';
      this.stateList = [];
    }
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
  getCurrentDate() {
    console.log(new Date().toISOString().split('T')[0]);
    return new Date().toISOString().split('T')[0];
  }
  lastCharIsADot(string: string) {
    return string.slice(-1) === '.';
  }
}
