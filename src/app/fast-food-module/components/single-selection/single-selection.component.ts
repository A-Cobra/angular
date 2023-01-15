import { Component, OnInit, Input } from '@angular/core';

import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { defaultSingleSelection } from 'src/app/utils/default-single-selection';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { OptionDetails } from '../../models/option-details.interface';

@Component({
  selector: 'app-single-selection',
  styleUrls: ['./single-selection.component.scss'],
  template: `
    <h3>Single Selection Component</h3>
    <div *ngIf="customizableOption">
      Options
      <h1>{{ customizableOption.name }}</h1>

      <form [formGroup]="form">
        <div class="container" formArrayName="selectedOptionsArray">
          <div *ngFor="let option of customizableOption.options; index as i">
            <input
              [id]="'select' + id + i"
              type="radio"
              [checked]="option.selected"
              [name]="'select' + id" />
            <!-- <label [for]="'select' + id + i"
              >{{ option.name
              }}<span *ngIf="option.extraPrice">
                ({{
                  option.extraPrice | currency : 'USD' : 'symbol' : '1.2-2'
                }})</span
              ></label
            > -->
          </div>
        </div>
      </form>
      <!-- <form [formGroup]="form">
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
    </form> -->
      <!-- <div [formGroup]="parentForm">
        <div formArrayName="dynamicComponents">
          <div
            *ngFor="let option of customizableOption.options; index as i"
            class="formGroup">
            <input [formControlName]="i" type="radio" value="HTML" />
            <label [for]="customizableOption.type + id + i">{{
              option.name
            }}</label
            ><br />
          </div>
        </div>
      </div> -->
      <!-- 
    <div *ngIf="customizableOption">
      <div>
        <div
          *ngFor="let option of customizableOption.options"
          class="formGroup">
          <input type="radio" name="fav_language" value="HTML" />
          <label for="html">{{ option.name }}</label
          ><br />
        </div>
      </div>
    </div> -->
    </div>
  `,
})
export class SingleSelectionComponent implements OnInit {
  id!: number;
  customizableOption: CustomizableOption = { ...defaultSingleSelection };
  @Input()
  parentForm!: FormGroup;
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.generateControls();
  }

  generateControls(): void {
    const options = this.customizableOption.options?.map(
      (option: OptionDetails) =>
        new FormControl<boolean>(option.selected, { nonNullable: true })
    );
    const selectedOptionsFormArray = new FormArray(
      options as FormControl<boolean>[]
    );
    this.form = new FormGroup({
      selectedOptionsArray: selectedOptionsFormArray,
    });
    console.log('this.form.value on single-selection');
    console.log(this.form.value);
  }

  getFormArrayControl(): AbstractControl {
    return this.form.controls['selectedOptionsArray'];
  }

  getFormArrayValue(): boolean[] {
    return this.form.controls['selectedOptionsArray'].value;
  }
}
