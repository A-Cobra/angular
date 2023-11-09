import { CartItem } from './cart-item.interface';

export interface CartData {
  completed_at?: string;
  created_at: string;
  id: number;
  items: CartItem[];
  number: number;
  status: string;
  total: string;
  total_items: string;
  user_id: number;
}
