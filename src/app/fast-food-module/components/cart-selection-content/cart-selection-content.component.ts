import { Component, Input, OnInit } from '@angular/core';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { OptionDetails } from '../../models/option-details.interface';
import { OptionNameSelectionPair } from '../../models/option-name-selection-pair.type';

@Component({
  selector: 'app-cart-selection-content',
  styleUrls: ['./cart-selection-content.component.scss'],
  template: `
    <div *ngIf="chosenOptions.length > 0">
      <div>
        <h3>Your Selections:</h3>
        <p *ngFor="let chosenOption of chosenOptions">
          - {{ chosenOption.name }}: <span>{{ chosenOption.value }}</span>
        </p>
      </div>
    </div>
  `,
})
export class CartSelectionDetailsComponent implements OnInit {
  chosenOptions: OptionNameSelectionPair[] = [];
  @Input()
  customizableOptions!: CustomizableOption[];

  constructor() {}

  ngOnInit(): void {
    this.generateChosenOptions();
  }

  generateChosenOptions(): void {
    // const chosenOptions: OptionNameSelectionPair[] = [];
    this.customizableOptions.forEach(
      (customizableOption: CustomizableOption) => {
        this.chosenOptions.push({ name: customizableOption.name, value: '' });
      }
    );
    this.customizableOptions.forEach(
      (customizableOption: CustomizableOption, customOptionIndex: number) => {
        if (
          (customizableOption.type === 'multi-select' ||
            customizableOption.type === 'single-select') &&
          customizableOption.options
        ) {
          const multipleSelectionOptions: string[] = [];
          customizableOption.options.forEach(
            (option: OptionDetails, index: number) => {
              if (option.selected) {
                multipleSelectionOptions.push(option.name);
              }
            }
          );
          console.log('Multiple Selection Options');
          console.log(multipleSelectionOptions);
          this.chosenOptions[customOptionIndex].value =
            multipleSelectionOptions.length === 0
              ? '-'
              : multipleSelectionOptions.join(', ');
          //     : multipleSelectionOptions.join(', ');
        } else if (customizableOption.type === 'text') {
          console.log('TEXT');
          console.log('customizableOption.name');
          console.log(customizableOption.name);
          this.chosenOptions[customOptionIndex].value =
            customizableOption.value ?? '-';
        }
      }
    );
    console.log('this.chosenOptions');
    console.log(this.chosenOptions);
  }
}
