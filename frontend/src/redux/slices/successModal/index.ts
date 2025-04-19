import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

type SuccessModal = {
  open: boolean;
  title: string | ReactNode;
  description: string | ReactNode;
  onClose?: Function;
};

type openSuccessModalData = {
  payload: {
    title: string | ReactNode;
    description: string | ReactNode;
    onClose?: Function;
  };
};

const initialState: SuccessModal = {
  open: false,
  title: '',
  description: '',
  onClose: () => {},
};

export const successModalSlice = createSlice({
  name: 'successModal',
  initialState,
  reducers: {
    openSuccessModal(state, { payload }: openSuccessModalData) {
      return { ...state, onClose: () => {}, open: true, ...payload };
    },
    closeSuccessModal(state) {
      return { ...state, open: false };
    },
  },
});

export const { openSuccessModal, closeSuccessModal } =
  successModalSlice.actions;
