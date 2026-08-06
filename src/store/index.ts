import {configureStore} from "@reduxjs/toolkit";
import registrationReducer from "@/store/registration/Slices/registrationSlice";
import authorizationReducer from "@/store/authorization/Slices/authorizationSlice"
import profileReducer from "@/store/profile/Slices/profileSlice";
import usersSlice from "@/store/users/Slice/usersSlice";
import userSlice from "@/store/user/Slice/userSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    authorization: authorizationReducer,
    profile: profileReducer,
    users: usersSlice,
    user: userSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch