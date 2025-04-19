import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICollaborator, IPatient, IRole } from 'src/interfaces';
import { api } from 'src/services/api';
import { handleRequestError } from 'src/utils';

export const getCollaborators = createAsyncThunk(
  'user/getCollaborators',
  async (_, { dispatch }) => {
    try {
      const { data } = await api.backend.get<ICollaborator[]>('/collaborators');

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const getPatients = createAsyncThunk(
  'user/getPatients',
  async (_, { dispatch }) => {
    try {
      const { data } = await api.backend.get<IPatient[]>('/patients');

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (_, { dispatch }) => {
    try {
      const { data } = await api.backend.get<IRole[]>('/collaborators/role');

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const saveProfile = createAsyncThunk(
  'user/saveProfile',
  async (newUser: ICollaborator | IPatient, { dispatch }) => {
    try {
      const { data } = await api.backend.put<ICollaborator | IPatient>(
        '/user/update',
        newUser,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const createRole = createAsyncThunk(
  'user/createRole',
  async (role: IRole, { dispatch }) => {
    try {
      const { data } = await api.backend.post<IRole>(
        '/collaborators/role',
        role,
      );

      return data;
    } catch (error: any) {
      handleRequestError(error, dispatch);
    }
  },
);

export const start = createAsyncThunk('user/start', async (_, { dispatch }) => {
  try {
    const { data } = await api.backend.post<IRole>('/auth/start');

    return data;
  } catch (error: any) {
    handleRequestError(error, dispatch);
  }
});
