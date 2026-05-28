import {configureStore} from "@reduxjs/toolkit";
import registrationReducer from "./registration/Slices/registrationSlice.ts";
import authorizationReducer from "./authorization/Slices/authorizationSlice.ts"
import profileReducer from "./profile/Slices/profileSlice.ts";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    authorization: authorizationReducer,
    profile: profileReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch