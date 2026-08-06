import { RootState } from "@/store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "@/store/utils";
import {usersState} from "@/store/initialState/users/initialStateUsers.ts";

export const selectUsersStore = (state: RootState): usersState => state.users;

export const selectUsersRequest = createSelector(selectUsersStore, (state: usersState) => getAsyncRequestData(state.users));
export const selectUsersStatus = createSelector(selectUsersRequest, (getUsers) => getUsers.status);

export const selectDeleteUserRequest = createSelector(selectUsersStore, (state: usersState) => getAsyncRequestData(state.deleteUser));
export const selectDeleteUserStatus = createSelector(selectDeleteUserRequest, (deleteUser) => deleteUser.status);

export const selectBlockedUserRequest = createSelector(selectUsersStore, (state: usersState) => getAsyncRequestData(state.blockedUser));
export const selectBlockedUserStatus = createSelector(selectBlockedUserRequest, (blockedUser) => blockedUser.status);

export const selectUnblockedUserRequest = createSelector(selectUsersStore, (state: usersState) => getAsyncRequestData(state.unblockedUser));
export const selectUnblockedUserStatus = createSelector(selectUnblockedUserRequest, (unblockedUser) => unblockedUser.status);

export const selectEditRolesUserRequest = createSelector(selectUsersStore, (state: usersState) => getAsyncRequestData(state.editRolesUser));
export const selectEditRolesUserStatus = createSelector(selectEditRolesUserRequest, (editRolesUser) => editRolesUser.status);