import { MenuItem } from './menu-item.interface';

export type Order = {
  totalPrice: number;
  date: string;
  id: number;
  orderItems: MenuItem[];
};
