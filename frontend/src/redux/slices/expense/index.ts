import { createSlice } from '@reduxjs/toolkit';
import { IExpenseType, IThunkLoading, ThunkLoadingEnum } from 'src/interfaces';
import { IExpensePage } from 'src/interfaces/expense/expensesPage';
import { getExpensesPage, getExpensesType } from './thunks';

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
  expenses: IExpensePage;
  expensesType: IExpenseType[];

  expensesLoading: IThunkLoading;
  expensesTypeLoading: IThunkLoading;
};

const initialState = {
  expenses: PAGE_INITIAL_STATE,
  expensesType: [],

  expensesLoading: ThunkLoadingEnum.IDLE,
  expensesTypeLoading: ThunkLoadingEnum.IDLE,
} as InitialState;

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getExpensesPage.pending, (state) => {
        state.expensesLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getExpensesPage.fulfilled, (state, { payload }) => {
        state.expenses = payload!;
        state.expensesLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getExpensesPage.rejected, (state) => {
        state.expensesLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(getExpensesType.pending, (state) => {
        state.expensesTypeLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getExpensesType.fulfilled, (state, { payload }) => {
        state.expensesType = payload!;
        state.expensesTypeLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getExpensesType.rejected, (state) => {
        state.expensesTypeLoading = ThunkLoadingEnum.FAILED;
      });
  },
});

export * from './thunks';
