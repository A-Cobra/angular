import { OptionDetails } from './option-details.interface';

export interface CustomizableOption {
  name: string;
  type: string;
  options?: OptionDetails[];
  required: boolean;
  value?: string;
}
