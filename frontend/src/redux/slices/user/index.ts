import { createSlice } from '@reduxjs/toolkit';
import {
  IThunkLoading,
  ThunkLoadingEnum,
  ICollaborator,
  IPatient,
  IRole,
} from 'src/interfaces';
import { getCollaborators, getPatients, getRoles } from './thunks';

type InitialState = {
  collaborators: ICollaborator[];
  patients: IPatient[];
  roles: IRole[];

  collaboratorsLoading: IThunkLoading;
  patientsLoading: IThunkLoading;
  rolesLoading: IThunkLoading;
};

const initialState = {
  collaborators: [],
  patients: [],
  roles: [],

  collaboratorsLoading: ThunkLoadingEnum.IDLE,
  patientsLoading: ThunkLoadingEnum.IDLE,
  rolesLoading: ThunkLoadingEnum.IDLE,
} as InitialState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCollaborators.pending, (state) => {
        state.collaboratorsLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getCollaborators.fulfilled, (state, { payload }) => {
        state.collaborators = payload!;
        state.collaboratorsLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getCollaborators.rejected, (state) => {
        state.collaboratorsLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(getPatients.pending, (state) => {
        state.patientsLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getPatients.fulfilled, (state, { payload }) => {
        state.patients = payload!;
        state.patientsLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getPatients.rejected, (state) => {
        state.patientsLoading = ThunkLoadingEnum.FAILED;
      })

      .addCase(getRoles.pending, (state) => {
        state.rolesLoading = ThunkLoadingEnum.PENDING;
      })
      .addCase(getRoles.fulfilled, (state, { payload }) => {
        state.roles = payload!;
        state.rolesLoading = ThunkLoadingEnum.SUCCEEDED;
      })
      .addCase(getRoles.rejected, (state) => {
        state.rolesLoading = ThunkLoadingEnum.FAILED;
      });
  },
});

export * from './thunks';
