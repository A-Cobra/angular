import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
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
  customizableOption: CustomizableOption = { ...defaultFormText };
  @ViewChild('textArea') textArea!: ElementRef;
  @Output()
  textareaChange: EventEmitter<TextareaEvent> =
    new EventEmitter<TextareaEvent>();

  constructor() {}
  onInputChange() {
    this.textareaChange.emit({
      value: this.textArea.nativeElement.value,
      id: this.id,
    });
  }
}
