import { RootState } from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";

export const selectUserStore = (state: RootState) => state.user;

export const selectUserRequest = createSelector(selectUserStore, (store) => getAsyncRequestData(store.user));
export const selectUserStatus = createSelector(selectUserRequest, (getUser) => getUser.status);

export const selectUpdateUserRequest = createSelector(selectUserStore, (store) => getAsyncRequestData(store.updateUser));
export const selectUpdateUserStatus = createSelector(selectUpdateUserRequest, (updateUser) => updateUser.status);