import { RootState } from "../../store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "../../store/utils.ts";


export const selectUsersStore = (state: RootState) => state.users;

export const selectUsersRequest = createSelector(selectUsersStore, (store) => getAsyncRequestData(store.users));
export const selectUsersStatus = createSelector(selectUsersRequest, (getUsers) => getUsers.status);