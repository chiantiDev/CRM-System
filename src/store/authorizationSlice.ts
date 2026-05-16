import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../hook/hook";
import {AuthData, Token} from "../types/registration"
import apiClient from "../api/apiClient.ts";
import {handleErrorRegistration} from "../api/apiError.ts"

interface  authorizationState {
  token: Token | null,
  isLoading: boolean;
  error: string | null;
}

const initialState: authorizationState = {
  token: localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')
    ? {
      accessToken: localStorage.getItem('accessToken')!,
      refreshToken: localStorage.getItem('refreshToken')!
    }
    : null,
  isLoading: false,
  error: null,
};

export const authorizationUser = createAppAsyncThunk<Token, AuthData>(
  'authorization/authorizationUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/signin', formData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorRegistration(error));
    }
  }
);

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authorizationUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authorizationUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload
        if (action.payload) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(authorizationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})

export default authorizationSlice.reducer;