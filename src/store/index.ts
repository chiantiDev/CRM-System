import {configureStore} from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import authReducer from "./loginSlice.ts"
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    authorization: authReducer,
    profile: profileReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch