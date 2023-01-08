import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MyValidations {
  static notNoneValue(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'none') {
      return { noneValue: true };
    }
    return null;
  }
}
