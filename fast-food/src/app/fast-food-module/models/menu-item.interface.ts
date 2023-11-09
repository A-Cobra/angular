import { CustomizableOption } from './customizable-option.interface';

export interface MenuItem {
  id: number;
  name: string;
  image?: string;
  categoryId: number;
  description: string;
  basePrice: number;
  customizableOptions: CustomizableOption[];
}
