import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
import { SingleSelectionEvent } from '../../models/single-selection-event.type';

@Component({
  selector: 'app-single-selection',
  styleUrls: ['./single-selection.component.scss'],
  template: `
    <div *ngIf="customizableOption">
      <div class="flex-wrapper">
        <h3
          [ngClass]="{
            required: customizableOption.required
          }">
          {{ customizableOption.name }}
        </h3>
      </div>
      <form [formGroup]="form">
        <div class="container">
          <div *ngFor="let option of customizableOption.options; index as i">
            <input
              (change)="onInputChange()"
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
    </div>
  `,
})
export class SingleSelectionComponent implements OnInit {
  id!: number;
  customizableOption: CustomizableOption = { ...defaultSingleSelection };
  @Input()
  parentForm!: FormGroup;
  @Output()
  singleSelectionChange: EventEmitter<SingleSelectionEvent> =
    new EventEmitter<SingleSelectionEvent>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generateControls();
  }

  generateControls(): void {
    let selectedId = -1;
    this.customizableOption?.options?.forEach(
      (option: OptionDetails, index) => {
        console.log(option);
        if (option.selected) {
          selectedId = index;
        }
      }
    );
    this.form = new FormGroup({
      selectedOption: new FormControl<number>(selectedId, {
        nonNullable: true,
      }),
    });
  }

  getSelectedValue(): number {
    return this.form.controls['selectedOption'].value;
  }

  displayEvent($event: any): void {
    console.log('Event After radio press');
    console.log($event);
  }

  onInputChange(): void {
    const selectedValue = this.getSelectedValue();
    const customizableOption = JSON.parse(
      JSON.stringify(this.customizableOption)
    );
    customizableOption?.options?.forEach(
      (option: OptionDetails, index: number) => {
        if (selectedValue === index) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    );
    this.singleSelectionChange.emit({
      customizableOption: customizableOption,
      id: this.id,
    });
  }
}
