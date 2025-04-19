import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICollaborator, IPatient, IScheduling, IType } from 'src/interfaces';
import { IPaymentPage } from 'src/interfaces/scheduling/paymentPage';
import { api } from 'src/services/api';
import { handleRequestError } from 'src/utils';

type GetPaymentPageParams = {
  startDate: string | Date;
  endDate: string | Date;
  size: number;
  page: number;
};

export const getByUser = createAsyncThunk(
  'scheduling/getByUser',
  async ({ id, userType }: IPatient | ICollaborator, { dispatch }) => {
    try {
      const { data } = await api.backend.post<IScheduling[]>(
        '/scheduling/by-user',
        {
          id,
          userType,
        },
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const updateScheduling = createAsyncThunk(
  'scheduling/updateScheduling',
  async (scheduling: IScheduling, { dispatch }) => {
    try {
      const { data } = await api.backend.put<IScheduling>(
        '/scheduling',
        scheduling,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const getTypes = createAsyncThunk(
  'scheduling/getTypes',
  async (_, { dispatch }) => {
    try {
      const { data } = await api.backend.get<IType[]>('/scheduling/type');

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const getPaymentPage = createAsyncThunk(
  'scheduling/getPaymentPage',
  async (
    { startDate, endDate, page, size }: GetPaymentPageParams,
    { dispatch },
  ) => {
    try {
      const { data } = await api.backend.get<IPaymentPage>(
        `/scheduling/payment?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const createSchedulingType = createAsyncThunk(
  'scheduling/createSchedulingType',
  async (schedulingType: IType, { dispatch }) => {
    try {
      const { data } = await api.backend.post<IPaymentPage>(
        `/scheduling/type`,
        schedulingType,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);
