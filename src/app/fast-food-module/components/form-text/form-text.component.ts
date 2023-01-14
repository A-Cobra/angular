import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { TextareaEvent } from '../../models/textarea-event.type';

@Component({
  selector: 'app-form-text',
  styleUrls: ['./form-text.component.scss'],
  template: `
    <div>
      <label
        [for]="'text-area' + id"
        [ngClass]="{
          required: customizableOption.required
        }"
        >{{ customizableOption.name }}</label
      >
      <textarea
        #textArea
        (input)="onInputChange()"
        [id]="'text-area' + id"></textarea>
      <!-- Enhance the id  -->
    </div>
  `,
})
export class FormTextComponent {
  @Input()
  id: number = 0;
  @Input()
  customizableOption: CustomizableOption = {
    name: 'Enter special indications for Burger #1',
    type: 'text',
    required: false,
  };
  @ViewChild('textArea') textArea!: ElementRef;
  @Output()
  textareaChange: EventEmitter<TextareaEvent> =
    new EventEmitter<TextareaEvent>();

  constructor() {}
  onInputChange() {
    console.log('Input changed');
    console.log(this.textArea.nativeElement.value);
    this.textareaChange.emit({
      value: this.textArea.nativeElement.value,
      id: this.id,
    });
  }
}
