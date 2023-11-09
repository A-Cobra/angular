export type CartPayloadForUpdate = {
  data: Data;
};

interface Data {
  items: Item[];
}

interface Item {
  id: number;
  quantity: number;
}
