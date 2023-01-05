import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FormEvent } from '../../models/form-event.type';

@Component({
  selector: 'app-search-form',
  template: `
    <div>OK</div>
    <div>
      <form [formGroup]="fetchForm">
        <input
          formControlName="input"
          type="text"
          placeholder="Enter Github user name" />
        <button [disabled]="fetchForm.invalid" (click)="onSearch()">
          Search
        </button>
        <div class="error">
          <div *ngIf="isRequired('input')">
            The input has to have at least a character
          </div>
        </div>
      </form>
    </div>
    <pre>{{ fetchForm.value | json }}</pre>
  `,
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  @Output()
  formEvent = new EventEmitter<FormEvent>();
  fetchForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.fetchForm = this.formBuilder.group({
      input: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
        asyncValidators: [],
      }),
    });
  }
  onSearch() {
    const inputValue = this.fetchForm.get('input')?.value;
    if (inputValue) {
      this.formEvent.emit({
        type: 'search',
        inputValue,
      });
    }
  }
  isRequired(controlName: string) {
    return (
      this.fetchForm.get(controlName)?.hasError('required') &&
      this.fetchForm.get(controlName)?.touched
    );
  }
}
