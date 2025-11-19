export type TopAskedResponse = {
  status?: boolean;
  message?: string;
  data?: TopAskedArray[];
};

export type TopAskedArray = {
  title?: string;
  description?: string;
  id?: number;
};
