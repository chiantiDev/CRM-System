import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@/hook/hook";
import {UserRegistration} from "@/types/auth"
import apiClient from "@/api/apiClient";
import {handleErrorAuthentication} from "@/api/apiError"
import {initialState} from "@/store/initialState/registration/initialStateRegistration";
import {addAsyncBuilderCases} from "@/store/utils";

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