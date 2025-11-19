export type Errors = {
  email: string[] | null | undefined;
  name: string[] | null | undefined;
  address: string[] | null | undefined;
  password: string[] | null | undefined;
  message: string[] | null | undefined;
  [key: string]: string[] | null | undefined;
};

export type GenericErrorBean = {
  status?: number;
  success?: boolean;
  message?: string;
  data: {
    success?: boolean;
    message?: string | Errors;
    errors?: Errors;
  };
};

export type GenericError = {
  status?: number;
  data: {
    message?: string;
    errors: {
      [key: string]: string[];
    };
  };
};

export type NormalizedError = {
  message?: string;
  errors?: Record<string, string[]>;
  status?: number;
};
