export type LoginSuccessfulResponse = {
  data: {
    toke: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
};
