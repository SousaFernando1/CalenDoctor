export enum ThunkLoadingEnum {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export type IThunkLoading = ThunkLoadingEnum;
