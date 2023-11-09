import { MenuItem } from '../fast-food-module/models/menu-item.interface';

export const defaultMenuSelection: MenuItem = {
  id: 1,
  name: 'Burger for 2',
  image:
    'https://www.meatpoultry.com/ext/resources/images/2/f/o/r/1/l/a/e/e/m/05/2for10WhopperMeal.jpg',
  categoryId: 1,
  description:
    "Don't want to share? This combo includes 2 burgers, 2 sides and 2 beverages. You can customize your burgers.",
  basePrice: 15.99,
  customizableOptions: [
    {
      name: 'Select the type of bread for the Burger #1',
      type: 'single-select',
      options: [
        {
          name: 'Regular Bun',
          selected: true,
        },
        {
          name: 'Whole Wheat Bun',
          selected: false,
          extraPrice: 1,
        },
      ],
      required: true,
    },
    {
      name: 'Select type of meat for the Burger #1',
      type: 'single-select',
      options: [
        {
          name: 'Regular Meat',
          selected: true,
        },
        {
          name: 'Began Meat',
          selected: false,
          extraPrice: 2,
        },
      ],
      required: true,
    },
    {
      name: 'Select extra ingredients for the Burger #1',
      type: 'multi-select',
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
      required: false,
    },
    {
      name: 'Enter special indications for Burger #1',
      type: 'text',
      required: false,
    },
    {
      name: 'Select beverage for Burger #1',
      type: 'single-select',
      options: [
        {
          name: 'Soda',
          selected: false,
        },
        {
          name: 'Water',
          selected: false,
        },
      ],
      required: true,
    },
  ],
};
