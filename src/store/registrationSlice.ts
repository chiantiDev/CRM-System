import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../hook/hook";
import {UserRegistration} from "../types/registration"
import apiClient from "../api/apiClient.ts";
import {handleErrorRegistration} from "../api/apiError.ts"

interface  registrationState {
  isLoading: boolean;
  error: string | null;
}

const initialState: registrationState = {
  isLoading: false,
  error: null,
};

export const registrationUser = createAppAsyncThunk<undefined, UserRegistration>(
  'registration/registrationUser',
  async (formData, { rejectWithValue }) => {
    try {
      await apiClient.post('/auth/signup', formData);
    } catch (error: unknown) {
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
      .addCase(registrationUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registrationUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})

export default registrationSlice.reducer;