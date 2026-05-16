import {configureStore} from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import authorizationReducer from "./authorizationSlice"

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    authorization: authorizationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch