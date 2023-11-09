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
    if (inputDate + 86400000 > today) {
      return { afterToday: true };
    }
    return null;
  }
  static minDigits(minimumDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let originalNumber = parseInt(control.value.replace(/\s+/g, ''));
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
      return null;
    };
  }
  static passwordsMatch(form: AbstractControl): ValidationErrors | null {
    return form.get('password')?.get('value')?.value !==
      form.get('password')?.get('confirmation')?.value
      ? { differentPasswords: true }
      : null;
  }
  static passwordStrength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const containsNumbers = password.match(/[0-9]+/);
      const containsSpecialChars = password.match(/[^0-9A-Za-z]+/);
      const longerThanNChars = password.length >= min;
      if (!containsNumbers) {
        return { noNumbers: true };
      }
      if (!containsSpecialChars) {
        return { noSpecialCharacters: true };
      }
      if (!longerThanNChars) {
        return { notLongEnough: true };
      }
      return null;
    };
  }
}
