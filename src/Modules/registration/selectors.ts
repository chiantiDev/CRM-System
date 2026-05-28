import { RootState } from "../../store";
import {createSelector} from "@reduxjs/toolkit";
import {getAsyncRequestData} from "../../store/utils.ts";


export const selectRegistrationStore = (state: RootState) => state.registration;

export const selectRegistrationRequest = createSelector(selectRegistrationStore, (state) => getAsyncRequestData(state.registration));
export const selectRegistrationStatus = createSelector(selectRegistrationRequest, (registration) => registration.status);

