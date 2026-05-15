import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../hook/hook";
import {UserRegistration, Profile} from "../types/registration"
import apiClient from "../api/apiClient.ts";
import {handleErrorRegistration} from "../api/apiError.ts"

interface RegistrationState {
  user: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  user:  null,
  isLoading: false,
  error: null,
};

export const registerUser = createAppAsyncThunk<Profile, UserRegistration>(
  'registration/registerUser',
  async (formData, { rejectWithValue }) => {
    try {

      const response = await apiClient.post('/auth/signup', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorRegistration(error));
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})

export default registrationSlice.reducer;