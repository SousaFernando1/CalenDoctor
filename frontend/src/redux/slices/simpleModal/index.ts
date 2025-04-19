import { createSlice } from '@reduxjs/toolkit';

type SimpleModal = {
  open: boolean;
  title: string;
  description: string;
  simpleLabel: string;
  cancelLabel: string;
  action: () => void;
  rejectAction: () => void;
};

const initialState: SimpleModal = {
  open: false,
  title: '',
  description: '',
  simpleLabel: '',
  cancelLabel: '',
  action: () => {},
  rejectAction: () => {},
};

export const simpleModalSlice = createSlice({
  name: 'simpleModal',
  initialState,
  reducers: {
    openSimpleModal(state, { payload }) {
      return { ...state, ...payload, open: true };
    },
    closeSimpleModal(state) {
      return { ...state, open: false };
    },
  },
});

export const { openSimpleModal, closeSimpleModal } = simpleModalSlice.actions;
