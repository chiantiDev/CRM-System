import {ActionReducerMapBuilder, AsyncThunk, Draft} from "@reduxjs/toolkit";

export interface IAsyncParticle<T> {
  data: T | null;
  error: Error | string | null | unknown;
  errorCounter: number;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

export const initAsyncParticle = <T extends unknown>(data: T | null = null): IAsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: 'idle'
})

export const addAsyncBuilderCases = <State, RQ, RS, ThunkConfig extends object = any>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<RS, RQ, ThunkConfig>,
  selector: (state: Draft<State>) => IAsyncParticle<RS>
): void => {
  builder
    .addCase(thunk.pending, (state: Draft<State>) => {
      const target = selector(state);
      target.status = 'pending';
      target.error = null;
    })
    .addCase(thunk.fulfilled, (state: Draft<State>, action) => {
      const target = selector(state);
      target.status = 'fulfilled';
      target.data = action.payload;
      target.error = null;
    })
    .addCase(thunk.rejected, (state: Draft<State>, action) => {
      const target = selector(state);
      target.status = 'rejected';
      target.error = action.payload;
      target.errorCounter += 1;
    });
};

export interface IAsyncDataStatus {
  hasError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingOrIdle: boolean;
  isLoaded: boolean;
  isLoadedOrError: boolean;
}

export const getAsyncDataStatus = (data: IAsyncParticle<unknown>): IAsyncDataStatus => ({
  hasError: data?.status === 'rejected',
  isIdle: data?.status === 'idle',
  isLoading: data?.status === 'pending',
  isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
  isLoaded: data?.status === 'fulfilled',
  isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected',
});

export interface IErrorData {
  message?: string;
  code?: string | number;
  [key: string]: any;
}

export const getAsyncRequestData = <T>(stateParam: IAsyncParticle<T>): {
  data: T | null;
  error: IErrorData | null | unknown;
  errorCounter: number;
  status: IAsyncDataStatus;
} => ({
  data: stateParam?.data,
  error: stateParam?.error,
  errorCounter: stateParam?.errorCounter,
  status: getAsyncDataStatus(stateParam)
});