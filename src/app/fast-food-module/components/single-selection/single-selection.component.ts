import { Component, OnInit, Input } from '@angular/core';

import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomizableOption } from '../../models/customizable-option.interface';

@Component({
  selector: 'app-single-selection',
  styleUrls: ['./single-selection.component.scss'],
  template: `
    <div>Single Selection Component</div>
    <div *ngIf="customizableOption">
      Options
      <h1>{{ customizableOption.name }}</h1>
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
export class SingleSelectionComponent {
  id!: number;
  customizableOption!: CustomizableOption;
  @Input()
  parentForm!: FormGroup;
  constructor() {}
}
