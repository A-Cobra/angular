import { CartItem } from './cart-item.interface';

export type CartResponse = {
  data: Data;
};

interface Data {
  id: number;
  user_id: number;
  number: number;
  status: string;
  total: string;
  total_items: string;
  completed_at?: any;
  created_at: string;
  items: CartItem[];
}
