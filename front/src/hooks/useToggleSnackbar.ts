import {SnackbarContext} from '@providers';
import {useContext} from 'react';

export const useToggleSnackBar = () => useContext(SnackbarContext);
