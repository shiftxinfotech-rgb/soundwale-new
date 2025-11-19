import {SnackbarContextParams, SnackbarProviderParams} from '@data';
import _ from 'lodash';
import React, {createContext, useCallback, useMemo, useState} from 'react';
import {Snackbar} from 'react-native-paper';

let displayMessage = '';
const SnackbarContext = createContext<SnackbarContextParams>({
  toggleMessage: () => {},
});

const SnackbarProvider: React.FC<SnackbarProviderParams> = ({children}) => {
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  const toggleSnackbar = useCallback((message: string = '') => {
    displayMessage = _.capitalize(message);
    setSnackbarVisible(old => !old);
  }, []);
  const onDismiss = useCallback(() => {
    displayMessage = '';
    setSnackbarVisible(old => !old);
  }, []);

  const memoView = useMemo<SnackbarContextParams>(
    () => ({
      toggleMessage: toggleSnackbar,
    }),
    [toggleSnackbar],
  );

  return (
    <SnackbarContext.Provider value={memoView}>
      {children}
      <Snackbar visible={snackbarVisible} onDismiss={onDismiss} duration={1500}>
        {displayMessage}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export {SnackbarContext, SnackbarProvider};
