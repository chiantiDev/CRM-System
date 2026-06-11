import { RootState } from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";

export const selectUsersStore = (state: RootState) => state.users;

export const selectUsersRequest = createSelector(selectUsersStore, (store) => getAsyncRequestData(store.users));
export const selectUsersStatus = createSelector(selectUsersRequest, (getUsers) => getUsers.status);

export const selectDeleteUserRequest = createSelector(selectUsersStore, (store) => getAsyncRequestData(store.deleteUser));
export const selectDeleteUserStatus = createSelector(selectDeleteUserRequest, (deleteUser) => deleteUser.status);