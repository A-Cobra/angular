import { Product } from 'src/app/models/product/product.interface';

export const defaultProduct: Product = {
  id: 15,
  slug: 'justins',
  name: "Justin's",
  description: 'Peanut Butter Cups',
  active: 1,
  likes_count: 2,
  likes_up_count: 2,
  likes_down_count: 0,
  published_at: '2020-08-12T17:21:51.617Z',
  master: {
    id: 15,
    sku: '432198',
    price: '7.890000000000001',
    promotional_price: '0.0',
    stock: 978,
    weight: null,
    height: null,
    width: null,
    depth: null,
    is_master: 1,
    position: 0,
  },
  category: {
    id: 22,
    slug: 'health-industrial-grocery',
    name: 'Health, Industrial & Grocery',
  },
  image: {
    id: 15,
    url: 'https://trainee-program.csdibanavyn2.us-east-1.rds.amazonaws.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a7ea6bfb1e072bcff4eecbd787ffafcfdc401b05/Justin_s.jpg',
  },
};
