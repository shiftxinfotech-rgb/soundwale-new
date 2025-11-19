import {Errors, GenericError, GenericErrorBean, NormalizedError} from '@data';

export const isErrorBean = (error: any): error is GenericErrorBean => {
  return error && typeof error === 'object' && 'status' in error;
};

export const isFetchBaseQueryError = (
  error: unknown,
): error is GenericError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const normalizeApiError = (error: unknown): NormalizedError => {
  const extractErrors = (maybeErrors: unknown): Errors | undefined => {
    return typeof maybeErrors === 'object' && maybeErrors !== null
      ? (maybeErrors as Errors)
      : undefined;
  };

  const extractMessage = (maybeMessage: unknown): string | undefined => {
    return typeof maybeMessage === 'string' ? maybeMessage : undefined;
  };
  if (isErrorBean(error)) {
    const {data, message} = error as GenericErrorBean;

    const errors = extractErrors(data?.errors) ?? extractErrors(data?.message);

    return {
      message:
        error.status === 401
          ? undefined
          : extractMessage(data?.message ?? message),
      errors: cleanErrors(errors),
      status: error?.status,
    };
  }

  if (isFetchBaseQueryError(error)) {
    const {data} = error as GenericError;
    return {
      message: error.status === 401 ? undefined : data?.message,
      errors: cleanErrors(data?.errors),
      status: error?.status,
    };
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: (error as any).message,
    };
  }

  return {};
};

function cleanErrors(errors?: {
  [key: string]: string[] | null | undefined;
}): Record<string, string[]> | undefined {
  if (!errors || typeof errors !== 'object') {
    return undefined;
  }

  const result: Record<string, string[]> = {};

  for (const key in errors) {
    const value = errors[key];
    if (Array.isArray(value)) {
      result[key] = value.filter(msg => typeof msg === 'string');
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}
