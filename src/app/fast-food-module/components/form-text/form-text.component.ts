import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomizableOption } from '../../models/customizable-option.interface';

@Component({
  selector: 'app-form-text',
  styleUrls: ['./form-text.component.scss'],
  template: `
    <div>
      <label
        for="text-area"
        [ngClass]="{
          required: customizableOption.required
        }"
        >{{ customizableOption.name }}</label
      >
      <textarea #textArea (input)="onInputChange()" id="text-area"></textarea>
      <!-- Enhance the id  -->
    </div>
  `,
})
export class FormTextComponent {
  @Input()
  customizableOption: CustomizableOption = {
    name: 'Enter special indications for Burger #1',
    type: 'text',
    required: false,
  };
  @ViewChild('textArea') textArea!: ElementRef;

  constructor() {}
  onInputChange() {
    console.log('Input changed');
    console.log(this.textArea.nativeElement.value);
  }
}
