import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../../hook/hook.ts";
import {UserRegistration} from "../../../types/auth.ts"
import apiClient from "../../../api/apiClient.ts";
import {handleErrorAuthentication} from "../../../api/apiError.ts"
import {initialState} from "../../initialState/initialStateRegistration/initialStateRegistration.ts";
import {addAsyncBuilderCases} from "../../utils.ts";

export const registrationUser = createAppAsyncThunk<void, UserRegistration>(
  'registration/registrationUser',
  async (formData, { rejectWithValue }) => {
    try {
      await apiClient.post<void, UserRegistration>('/auth/signup', formData);
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, registrationUser, (state) => state.registration);
  },
})

export default registrationSlice.reducer;