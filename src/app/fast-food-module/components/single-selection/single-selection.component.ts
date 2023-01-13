import { Component, OnInit, Input } from '@angular/core';

import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-single-selection',
  styleUrls: ['./single-selection.component.scss'],
  template: ``,
})
export class SingleSelectionComponent {
  @Input()
  parentForm!: FormGroup;
  constructor() {}
}
