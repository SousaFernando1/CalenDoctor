import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserSession } from 'src/interfaces';
import { ISignIn, ISignUp } from 'src/interfaces/auth/auth';
import { api } from 'src/services/api';
import { sessionStorage } from 'src/storage';
import { handleRequestError } from 'src/utils';
import { retry } from 'src/utils/promises';

export const login = createAsyncThunk(
  'session/login',
  async ({ email, password }: ISignIn, { dispatch }) => {
    try {
      const { data: loginData } = await retry(
        api.backendPublic.post<IUserSession>('/auth/login', {
          email,
          password,
        }),
        500,
        3,
      );

      const { token, user } = loginData;

      sessionStorage.setToken(token);
      sessionStorage.setUser(user);

      return loginData;
    } catch (error: any) {
      sessionStorage.clean();
      handleRequestError(error, dispatch);
    }
  },
);

export const signUp = createAsyncThunk(
  'session/signUp',
  async ({ name, password, email }: ISignUp, { dispatch }) => {
    try {
      const { data: loginData } = await retry(
        api.backendPublic.post<IUserSession>('/register', {
          name,
          email,
          password,
        }),
        500,
        3,
      );

      return loginData;
    } catch (error: any) {
      sessionStorage.clean();
      handleRequestError(error, dispatch);
    }
  },
);
