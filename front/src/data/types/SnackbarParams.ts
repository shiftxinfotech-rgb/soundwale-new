import React from 'react';

export type SnackbarContextParams = {
  toggleMessage: (message?: string | undefined) => void;
};

export type SnackbarProviderParams = {
  children: React.ReactNode;
};
