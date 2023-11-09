export type CartPayloadForRemoval = {
  data: Data;
};

type Data = {
  items: ItemToRemove[];
};

type ItemToRemove = {
  id: number;
  _destroy: boolean;
};
