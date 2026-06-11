import {RootState} from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";


export const selectProfileStore = (state: RootState) => state.profile;

export const selectProfileRequest = createSelector(selectProfileStore, (state) => getAsyncRequestData(state.profile));
export const selectProfileStatus = createSelector(selectProfileRequest, (profile) => profile.status);

export const selectLogoutRequest = createSelector(selectProfileStore, (state) => getAsyncRequestData(state.logout));
export const selectLogoutStatus = createSelector(selectLogoutRequest, (logout) => logout.status);

