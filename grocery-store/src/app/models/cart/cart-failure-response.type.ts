export type CartFailureResponse = {
  error: Error;
  headers: string;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
};

type Error = {
  errors: CartError[];
};

type CartError = {
  code: string;
  field_name: string;
  message: string;
};
