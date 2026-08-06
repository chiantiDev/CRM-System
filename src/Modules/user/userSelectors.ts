import { RootState } from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";
import {userState} from "@/store/initialState/user/initialStateUser.ts";

export const selectUserStore = (state: RootState): userState => state.user;

export const selectUserRequest = createSelector(selectUserStore, (state: userState) => getAsyncRequestData(state.user));
export const selectUserStatus = createSelector(selectUserRequest, (getUser) => getUser.status);

export const selectUpdateUserRequest = createSelector(selectUserStore, (state: userState) => getAsyncRequestData(state.updateUser));
export const selectUpdateUserStatus = createSelector(selectUpdateUserRequest, (updateUser) => updateUser.status);