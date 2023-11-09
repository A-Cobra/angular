export type CartFailureResponse = {
  error: ErrorContainer;
  headers: string;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
};

export type ErrorContainer = {
  errors: CartError[];
};

type CartError = {
  code: string;
  field_name: string;
  message: string;
};
