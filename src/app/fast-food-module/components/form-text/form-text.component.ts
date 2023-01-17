import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { defaultFormText } from 'src/app/utils/default-form-text';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { TextareaEvent } from '../../models/textarea-event.type';

@Component({
  selector: 'app-form-text',
  styleUrls: ['./form-text.component.scss'],
  template: `
    <div>
      <div class="flex-wrapper">
        <h3
          [ngClass]="{
            required: customizableOption.required
          }">
          {{ customizableOption.name }}
        </h3>
      </div>
      <!-- <textarea
        #textArea
        (input)="onInputChange()"
        [id]="'text-area' + id"></textarea> -->
      <input
        #textInput
        (input)="onInputChange()"
        [id]="'text-input' + id"
        type="text" />
    </div>
  `,
})
export class FormTextComponent {
  @Input()
  id: number = 0;
  @Input()
  customizableOption: CustomizableOption = { ...defaultFormText };
  @ViewChild('textInput') textInput!: ElementRef;
  @Output()
  textareaChange: EventEmitter<TextareaEvent> =
    new EventEmitter<TextareaEvent>();

  constructor() {}

  onInputChange() {
    this.textareaChange.emit({
      value: this.textInput.nativeElement.value,
      id: this.id,
    });
  }
}
