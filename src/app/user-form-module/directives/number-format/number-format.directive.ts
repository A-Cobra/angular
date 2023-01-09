import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
})
export class NumberFormatDirective {
  @Input()
  appNumberFormat!: number;
  @Input()
  originalFormControl!: AbstractControl;

  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;

  constructor(baseElement: ElementRef) {
    console.log(baseElement);
    // baseElement.nativeElement.value = this.originalFormControl.patchValue({
    //   phone: this.formatNumber(baseElement.nativeElement.value),
    // });
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log('event');
    console.log(event);
    console.log(input.value);
    event.preventDefault();
    if (
      input.value.replace(this.spaceRegex, '').match(this.nonNumericalRegex)
    ) {
      console.log('Letter Introduced');
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    input.value = this.nonInitialZero(input.value);
    input.value = this.removeNonNumericalCharacters(input.value);
    input.value = this.formatNumber(input.value);
    // this.formElement.nativeElement.value = input.value;
    this.originalFormControl.patchValue({
      phone: input.value,
    });
  }

  formatNumber(originalNumberString: string): string {
    let trimmed = originalNumberString.replace(this.spaceRegex, '');
    let separatedNumbers: string[] = [];
    for (let i = 0; i < trimmed.length; i += this.appNumberFormat) {
      separatedNumbers.push(trimmed.slice(i, i + this.appNumberFormat));
    }
    return separatedNumbers.join(' ');
  }

  removeNonNumericalCharacters(originalString: string): string {
    return originalString.replace(this.nonNumericalRegex, '');
  }

  nonInitialZero(originalString: string): string {
    if (originalString.replace(this.spaceRegex, '')[0] === '0') {
      return originalString.slice(1);
    }
    return originalString;
  }
}
