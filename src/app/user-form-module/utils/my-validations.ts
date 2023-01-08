import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidations {
  static notNoneValue(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'none') {
      return { noneValue: true };
    }
    return null;
  }
  static beforeToday(
    control: AbstractControl<string>
  ): ValidationErrors | null {
    const today = new Date().getTime();
    const inputDate = new Date(control.value ?? '2000-01-01').getTime();
    console.log('inputDate');
    console.log(inputDate);
    console.log('today');
    console.log(today);
    if (inputDate + 86400000 > today) {
      return { afterToday: true };
    }
    return null;
  }
  static minDigits(minimumDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let originalNumber = control.value;
      let numberOfDigits: number;
      if (originalNumber === 0) {
        numberOfDigits = 1;
      } else if (originalNumber < 0) {
        numberOfDigits = 0;
      } else {
        numberOfDigits = Math.round(Math.log10(originalNumber)) + 1;
      }
      if (numberOfDigits < minimumDigits) {
        return { minDigits: true };
      }
      console.log('originalNumber');
      console.log(originalNumber);
      console.log('numberOfDigits');
      console.log(numberOfDigits);
      return null;
    };
    // return (
    //   control: AbstractControl,
    //   minimumDigits: number
    // ): ValidationErrors | null => {
    //   let originalNumber = control.value;
    //   let numberOfDigits: number;
    //   if (originalNumber === 0) {
    //     numberOfDigits = 1;
    //   } else if (originalNumber < 0) {
    //     numberOfDigits = 0;
    //   } else {
    //     numberOfDigits = Math.round(Math.log10(originalNumber)) + 2;
    //   }
    //   if (numberOfDigits < minimumDigits) {
    //     return { minDigits: true };
    //   }
    //   return null;
    // };
  }
}
