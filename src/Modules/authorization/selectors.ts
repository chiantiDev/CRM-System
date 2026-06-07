import {RootState} from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";


export const selectAuthorizationStore = (state: RootState) => state.authorization;

export const selectAuthSessionRequest = createSelector(selectAuthorizationStore, (state) => getAsyncRequestData(state.session));
export const selectAuthSessionStatus = createSelector(selectAuthSessionRequest, (session) => session.status);

export const selectLoginRequest = createSelector(selectAuthorizationStore, (state) => getAsyncRequestData(state.login));
export const selectLoginStatus = createSelector(selectLoginRequest, (login) => login.status);

export const selectIsAuth = createSelector([selectAuthSessionRequest, selectLoginRequest], (session, login) => {return (session.status.isLoaded || login.status.isLoaded)});
