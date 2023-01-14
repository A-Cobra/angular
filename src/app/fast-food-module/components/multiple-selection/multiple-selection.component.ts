import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { defaultMultipleSelection } from 'src/app/utils/default-multiple-selection';
import { CustomizableOption } from '../../models/customizable-option.interface';

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
  form!: FormGroup;
  // = new FormGroup({
  //   selectedOptionsFormArray!: FormArray,
  // });
  // selectedOptionsFormArray!: FormArray;
  constructor() {}
  ngOnInit(): void {
    // this.selectedOptions = new FormArray(['']);
    this.generateControls();
    console.log('this.selectedOptionsFormArray');
    // console.log(this.selectedOptionsFormArray);
    console.log('this.form.value');
    console.log(this.form.value);
  }

  onCheckboxChange() {
    console.log('Checkbox changed');
  }
  generateControls() {
    const options = this.customizableOption.options?.map(
      option => new FormControl<boolean>(false, { nonNullable: true })
    );
    const selectedOptionsFormArray = new FormArray(
      options as FormControl<boolean>[]
    );
    this.form = new FormGroup({
      selectedOptionsArray: selectedOptionsFormArray,
    });
  }
}
