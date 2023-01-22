import { MasterData } from './master-data.interface';
import { ProductImage } from './product-image.type';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  active: number;
  likes_count: number;
  likes_up_count: number;
  likes_down_count: number;
  published_at: string;
  master?: MasterData;
  image?: ProductImage;
}
