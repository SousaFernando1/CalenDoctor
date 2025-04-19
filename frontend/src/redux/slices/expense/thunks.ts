import { createAsyncThunk } from '@reduxjs/toolkit';
import { IExpense, IExpenseType } from 'src/interfaces';
import { IExpensePage } from 'src/interfaces/expense/expensesPage';
import { api } from 'src/services/api';
import { handleRequestError } from 'src/utils';

type GetExpensesPageParams = {
  startDate: string | Date;
  endDate: string | Date;
  size: number;
  page: number;
};

export const getExpensesPage = createAsyncThunk(
  'expenses/getExpensesPage',
  async (
    { startDate, endDate, page, size }: GetExpensesPageParams,
    { dispatch },
  ) => {
    try {
      const { data } = await api.backend.get<IExpensePage>(
        `/expenses?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const getExpensesType = createAsyncThunk(
  'expenses/getExpensesType',
  async (_, { dispatch }) => {
    try {
      const { data } = await api.backend.get<IExpenseType[]>(`/expenses/type`);

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense: IExpense, { dispatch }) => {
    try {
      const { data } = await api.backend.post<IExpense>(`/expenses`, expense);

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const createExpenseType = createAsyncThunk(
  'expenses/createExpenseType',
  async (expense: IExpenseType, { dispatch }) => {
    try {
      const { data } = await api.backend.post<IExpenseType>(
        `/expenses/type`,
        expense,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);
