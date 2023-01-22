export type CartPayloadForCreation = {
  data: Data;
};

interface Data {
  items: Item[];
}

interface Item {
  product_variant_id: number;
  quantity: number;
}
