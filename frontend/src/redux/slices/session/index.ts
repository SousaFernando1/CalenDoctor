import { createSlice } from '@reduxjs/toolkit';
import {
  IThunkLoading,
  ThunkLoadingEnum,
  IPatient,
  ICollaborator,
} from 'src/interfaces';
import { sessionStorage } from 'src/storage';
import { login, signUp } from './thunks';

type InitialState = {
  user: IPatient | ICollaborator | null;

  signInLoading: IThunkLoading;
  signUpLoading: IThunkLoading;
};

const initialState = {
  user: sessionStorage.getUser(),

  signInLoading: ThunkLoadingEnum.IDLE,
  signUpLoading: ThunkLoadingEnum.IDLE,
} as InitialState;

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signOut() {
      sessionStorage.clean();

      return {
        ...initialState,
        user: null,
      };
    },
    updateFirstAccess(state) {
      if (state.user) {
        state.user.firstAccess = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.signInLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user } = payload!;

        state.user = user;
        state.signInLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(login.rejected, (state) => {
        state.signInLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(signUp.pending, (state) => {
        state.signUpLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        const { user } = payload!;

        state.user = user;
        state.signUpLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(signUp.rejected, (state) => {
        state.signUpLoading = ThunkLoadingEnum.FAILED;
      });
  },
});

export const { signOut, updateFirstAccess } = sessionSlice.actions;
export * from './thunks';
