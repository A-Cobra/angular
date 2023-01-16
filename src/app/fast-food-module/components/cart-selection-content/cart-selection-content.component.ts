import { Component, Input, OnInit } from '@angular/core';
import { CustomizableOption } from '../../models/customizable-option.interface';
import { OptionDetails } from '../../models/option-details.interface';
import { OptionNameSelectionPair } from '../../models/option-name-selection-pair.type';

@Component({
  selector: 'app-cart-selection-content',
  styleUrls: ['./cart-selection-content.component.scss'],
  template: `
    <h2>App CART SELECTION COMPONENT</h2>
    <div *ngIf="chosenOptions.length > 0">
      <div>
        <h3>Your Selections:</h3>
        <p *ngFor="let chosenOption of chosenOptions">
          - {{ chosenOption.name }}
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
    // this.customizableOptions.forEach(
    //   (customizableOption: CustomizableOption) => {
    //     if (
    //       customizableOption.type === 'multi-select' &&
    //       customizableOption.options
    //     ) {
    //       customizableOption.options.forEach(
    //         (option: OptionDetails, index: number) => {
    //           if (index === customizableOption.options?.length ?? 0 - 1) {
    //           }
    //         }
    //       );
    //     }
    //   }
    // );
  }
}
