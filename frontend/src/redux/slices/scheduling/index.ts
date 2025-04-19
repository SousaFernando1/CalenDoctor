import { createSlice } from '@reduxjs/toolkit';
import {
  IThunkLoading,
  ThunkLoadingEnum,
  IScheduling,
  IType,
} from 'src/interfaces';
import { IPaymentPage } from 'src/interfaces/scheduling/paymentPage';
import { getByUser, getPaymentPage, getTypes } from './thunks';

const PAGE_INITIAL_STATE = {
  content: [],
  first: true,
  last: true,
  size: 0,
  number: 0,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
};

type InitialState = {
  schedulings: IScheduling[];
  types: IType[];
  paymentPage: IPaymentPage;

  schedulingsLoading: IThunkLoading;
  typesLoading: IThunkLoading;
  paymentPageLoading: IThunkLoading;
};

const initialState = {
  schedulings: [],
  types: [],
  paymentPage: PAGE_INITIAL_STATE,

  schedulingsLoading: ThunkLoadingEnum.IDLE,
  typesLoading: ThunkLoadingEnum.IDLE,
  paymentPageLoading: ThunkLoadingEnum.IDLE,
} as InitialState;

export const schedulingSlice = createSlice({
  name: 'scheduling',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getByUser.pending, (state) => {
        state.schedulingsLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getByUser.fulfilled, (state, { payload }) => {
        state.schedulings = payload!;
        state.schedulingsLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getByUser.rejected, (state) => {
        state.schedulingsLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(getTypes.pending, (state) => {
        state.typesLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getTypes.fulfilled, (state, { payload }) => {
        state.types = payload!;
        state.typesLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getTypes.rejected, (state) => {
        state.typesLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(getPaymentPage.pending, (state) => {
        state.paymentPageLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getPaymentPage.fulfilled, (state, { payload }) => {
        state.paymentPage = payload!;
        state.paymentPageLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getPaymentPage.rejected, (state) => {
        state.paymentPageLoading = ThunkLoadingEnum.FAILED;
      });
  },
});

export * from './thunks';
