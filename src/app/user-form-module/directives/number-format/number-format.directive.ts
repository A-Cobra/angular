import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
})
export class NumberFormatDirective implements OnInit {
  @Input()
  appNumberFormat!: number;
  @Input()
  originalFormControl!: AbstractControl;
  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;

  constructor(private baseElement: ElementRef) {}

  ngOnInit(): void {
    this.baseElement.nativeElement.value = this.formatNumber(
      this.baseElement.nativeElement.value
    );
    this.originalFormControl.patchValue({
      phone: this.baseElement.nativeElement.value,
    });
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = this.nonInitialZero(input.value);
    input.value = this.removeNonNumericalCharacters(input.value);
    input.value = this.formatNumber(input.value);
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
