import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  template: `
    <div>
      <form [formGroup]="fetchForm">
        <input
          formControlName="input"
          type="text"
          placeholder="Enter Github user name" />
        <button>Search</button>
      </form>
    </div>
    <pre>{{ fetchForm.value | json }}</pre>
  `,
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  fetchForm = new FormGroup({ input: new FormControl('') });
  constructor() {}
}
