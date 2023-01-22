export type LoginSuccessfulResponse = {
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
};
