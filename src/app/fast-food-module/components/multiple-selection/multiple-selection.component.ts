import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { defaultMultipleSelection } from 'src/app/utils/default-multiple-selection';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { MultipleSelectionEvent } from '../../models/multiple-selection-event.type';
import { OptionDetails } from '../../models/option-details.interface';

@Component({
  selector: 'app-multiple-selection',
  styleUrls: ['./multiple-selection.component.scss'],
  template: `
    <div class="container">
      <h2>Multiple selection</h2>
      <h3>Customizable Options</h3>
      <pre>{{ customizableOption | json }}</pre>
      <h3>Form</h3>
      <pre>{{ form.value | json }}</pre>
    </div>
    <form [formGroup]="form">
      <div class="container" formArrayName="selectedOptionsArray">
        <div *ngFor="let option of customizableOption.options; index as i">
          <input
            [formControlName]="i"
            (change)="onCheckboxChange()"
            [id]="'select' + id + i"
            type="checkbox"
            [checked]="option.selected" />
          <label [for]="'select' + id + i">{{ option.name }}</label>
        </div>
      </div>
    </form>
  `,
})
export class MultipleSelectionComponent implements OnInit {
  @Input()
  id: number = 0;
  @Input()
  customizableOption: CustomizableOption = { ...defaultMultipleSelection };
  @Output()
  multipleSelectionChange: EventEmitter<MultipleSelectionEvent> =
    new EventEmitter<MultipleSelectionEvent>();
  form!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.generateControls();
  }

  onCheckboxChange(): void {
    this.alterParentComponentsSelections();
  }

  generateControls(): void {
    const options = this.customizableOption.options?.map(
      (option: OptionDetails) =>
        new FormControl<boolean>(false, { nonNullable: true })
    );
    const selectedOptionsFormArray = new FormArray(
      options as FormControl<boolean>[]
    );
    this.form = new FormGroup({
      selectedOptionsArray: selectedOptionsFormArray,
    });
  }

  getFormArrayControl(): AbstractControl {
    return this.form.controls['selectedOptionsArray'];
  }

  getFormArrayValue(): boolean[] {
    return this.form.controls['selectedOptionsArray'].value;
  }

  alterParentComponentsSelections() {
    const selectedOptions: { selected: boolean }[] =
      this.getFormArrayValue().map((controlSelection: boolean) => {
        return { selected: controlSelection };
      });
    console.log('selectedOptions');
    console.log(selectedOptions);
    selectedOptions.forEach((option, index) => {
      Object.assign(
        this.customizableOption?.options?.[index] as OptionDetails,
        option
      );
    });
    console.log('this.customizableOption.options after generating options');
    console.log(this.customizableOption.options);
  }
}
