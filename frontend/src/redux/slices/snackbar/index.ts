import { createSlice } from '@reduxjs/toolkit';

type Snackbar = {
  open: boolean;
  message: string;
  duration: number;
};

type openSnackbarData = {
  payload: {
    message: string;
    duration?: number;
  };
};

const initialState: Snackbar = {
  open: false,
  message: '',
  duration: 4000,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, { payload }: openSnackbarData) {
      return { ...state, ...payload, open: true };
    },
    closeSnackbar(state) {
      return { ...state, open: false };
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
