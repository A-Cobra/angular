import { CustomizableOption } from '../fast-food-module/models/customizable-option.interface';

export const defaultMultipleSelection: CustomizableOption = {
  name: 'Select extra ingredients for',
  type: 'multi-select',
  required: false,
  options: [
    {
      name: 'Double meat',
      selected: false,
      extraPrice: 3,
    },
    {
      name: 'Extra cheese',
      selected: false,
      extraPrice: 1.5,
    },
    {
      name: 'Bacon',
      selected: false,
      extraPrice: 2,
    },
    {
      name: 'Extra sauce',
      selected: false,
      extraPrice: 0.5,
    },
  ],
};
