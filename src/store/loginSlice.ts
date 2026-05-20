import {AxiosResponse} from "axios";
import {createAppAsyncThunk} from "../hook/hook";
import apiClient, { setInMemoryToken } from "../api/apiClient.ts";
import {createSlice} from "@reduxjs/toolkit";
import {AuthData, RefreshToken, Token} from "../types/registration"
import {handleErrorAuthentication} from "../api/apiError.ts"
import { getProfileUser, logoutUser } from "./profileSlice.ts";

interface authState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  token: Token | null;
}

const initialState: authState = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  token: null,
};

export const checkAuthSession = createAppAsyncThunk<Token, void, { rejectValue: string  }>(
  'auth/checkAuthSession',
  async (_, { rejectWithValue }) => {
    const refreshTokenData = localStorage.getItem('refreshToken');
    if (!refreshTokenData) return rejectWithValue('Токен отсуствует');

    try {
      const response = await apiClient.post<Token, AxiosResponse<Token>, RefreshToken>('auth/refresh', {refreshToken: refreshTokenData});
      const { accessToken, refreshToken } = response.data;
      setInMemoryToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: unknown) {
      localStorage.clear()
      setInMemoryToken(null);
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

export const loginUser = createAppAsyncThunk<Token, AuthData>(
  'auth/loginUser',
  async (authData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/signin', authData);
      const { accessToken, refreshToken } = response.data;
      setInMemoryToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);


const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
      state.token = null;
      setInMemoryToken(null);
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(checkAuthSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.token = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        loginSlice.caseReducers.logout(state);
      })

      .addCase(getProfileUser.rejected, (state) => {
        loginSlice.caseReducers.logout(state);
      });
  },
})

export const { logout, updateToken } = loginSlice.actions;
export default loginSlice.reducer;