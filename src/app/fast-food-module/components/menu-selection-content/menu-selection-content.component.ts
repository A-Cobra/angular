import { Component, Input, OnInit } from '@angular/core';
import { CustomizableOption } from '../../models/customizable-option.interface';

@Component({
  selector: 'app-menu-selection-content',
  styleUrls: ['./menu-selection-content.component.scss'],
  template: `
    <div *ngIf="customizableOptions">
      <div *ngIf="notAppliedOptions">
        <h3>Options that can be applied:</h3>
        <p *ngFor="let customizableOption of customizableOptions">
          - {{ customizableOption.name }}
        </p>
      </div>
    </div>
  `,
})
export class MenuSelectionContentComponent {
  @Input()
  notAppliedOptions = true;
  @Input()
  customizableOptions!: CustomizableOption[];

  constructor() {}
}
