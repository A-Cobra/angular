import { CarCategory } from './car-category.type';
import { CarSpecs } from './car-specs.interface';
export interface CarGarageDisplay {
  category: CarCategory;
  collapsed: boolean;
  content: Array<CarSpecs>;
}
