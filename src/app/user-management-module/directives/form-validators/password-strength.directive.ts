import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

function createPasswordStrengthValidator(): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length === '') {
      return { notStrong: true };
    }
    return { notLong: true };
  };
}

@Directive({
  selector: '[appPasswordStrength]',
})
export class PasswordStrengthDirective implements Validator {
  constructor() {}
  static validate(inputControl: AbstractControl): ValidationErrors | null {
    if (inputControl.value.length < 5) {
      return { notLongEnough: true };
    }
    return null;
  }
  validate(inputControl: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(inputControl);
    // return (function (control: AbstractControl): ValidationErrors | null {
    //   const value = control.value;
    //   if (value.length < 5) {
    //     return { notStrong: true };
    //   }
    //   return { short: true };
    // })(inputControl);
  }
}
