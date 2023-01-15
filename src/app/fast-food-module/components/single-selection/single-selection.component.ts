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
      <h2>FORM VALUE</h2>
      <pre>{{ form.value | json }}</pre>

      <!-- <div class="form-group" [formGroup]="form">
        <label>Please select your gender</label>
        <div class="row">
          <label class="md-check">
            <input
              type="radio"
              value="triceraptor"
              name="gender"
              formControlName="gender" />
            Female
          </label>

          <label class="md-check">
            <input
              type="radio"
              value="male"
              name="gender"
              formControlName="gender" />
            Male
          </label>
        </div>
      </div> -->

      <!-- v2
      <form [formGroup]="form">
        <div class="container" formArrayName="selectedOptionsArray">
          <div
            [formGroupName]="i"
            *ngFor="let option of customizableOption.options; index as i">
            <input
              (click)="displayEvent($event)"
              formControlName="controlValue"
              [id]="'select' + id + i"
              type="radio"
              [value]="i"
              name="controlValue" />
            <label [for]="'select' + id + i"
              >{{ option.name
              }}<span *ngIf="option.extraPrice">
                ({{
                  option.extraPrice | currency : 'USD' : 'symbol' : '1.2-2'
                }})</span
              ></label
            >
          </div>
        </div>
      </form> -->

      <form [formGroup]="form">
        <div class="container">
          <div *ngFor="let option of customizableOption.options; index as i">
            <input
              (click)="displayEvent($event)"
              formControlName="selectedOption"
              [id]="'select' + id + i"
              type="radio"
              [value]="i"
              name="selectedOption" />
            <label [for]="'select' + id + i"
              >{{ option.name
              }}<span *ngIf="option.extraPrice">
                ({{
                  option.extraPrice | currency : 'USD' : 'symbol' : '1.2-2'
                }})</span
              ></label
            >
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generateControls();
    // this.form = this.fb.group({
    //   gender: '',
    // });
    console.log('WhATEVER');
  }

  generateControls(): void {
    // const options = this.customizableOption.options?.map(
    //   (option: OptionDetails) =>
    //     new FormGroup({
    //       controlValue: new FormControl<string>(option.selected ? 'on' : 'of', {
    //         nonNullable: true,
    //       }),
    //     })
    //   // new FormControl<boolean>(option.selected, { nonNullable: true })
    // );
    // console.log('options?.values in single selection');
    // console.log(options);
    // const selectedOptionsFormArray = new FormArray(
    //   options as FormGroup<{ controlValue: FormControl<'on' | 'of'> }>[]
    // );
    // console.log('selectedOptionsFormArray');
    // console.log(selectedOptionsFormArray);
    // this.form = new FormGroup({
    //   selectedOptionsArray: selectedOptionsFormArray,
    // });
    // let selectedId =
    let selectedId = -1;
    this.customizableOption?.options?.forEach(
      (option: OptionDetails, index) => {
        console.log(option);
        if (option.selected) {
          selectedId = index;
        }
      }
    );
    console.log('selectedId');
    console.log(selectedId);
    this.form = new FormGroup({
      selectedOption: new FormControl(selectedId, { nonNullable: true }),
    });
    console.log('this.form.value on single-selection GENERATING CONTROLS');
    console.log(this.form.value);
  }

  getFormArrayControl(): AbstractControl {
    return this.form.controls['selectedOptionsArray'];
  }

  getFormArrayValue(): boolean[] {
    return this.form.controls['selectedOptionsArray'].value;
  }

  displayEvent($event: any) {
    console.log('Event After radio press');
    console.log($event);
  }
}
