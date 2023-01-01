import { AbstractControl } from '@angular/forms';
export class MyValidations {
  static passwordStrength(inputControl: AbstractControl) {
    const value = inputControl.value;
    console.log(value);
    if (value.length < 5) {
      return { notLongENough: true };
    }
    return null;
  }
}
