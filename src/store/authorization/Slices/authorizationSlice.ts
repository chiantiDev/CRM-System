import {createAppAsyncThunk} from "../../../hook/hook.ts";
import {AxiosResponse} from "axios";
import {authApiClient} from "../../../api/apiClient.ts";
import {AuthData, Token, RefreshToken} from "../../../types/auth.ts";
import {createSlice} from "@reduxjs/toolkit";
import {logoutUser} from "../../profile/Slices/profileSlice.ts";
import {accessTokenStorage} from "../../../api/tokenStorage.ts";
import {handleErrorAuthentication} from "../../../api/apiError.ts";
import {addAsyncBuilderCases, initAsyncParticle} from "../../utils.ts";
import {initialStateAuthorization} from "../../initialState/initialStateAuthorization/initialStateAuthorization.ts";

export const checkAuthSession = createAppAsyncThunk<Token, void, { rejectValue: string }>(
  'authorization/checkAuthSession',
  async (_, { rejectWithValue }) => {
    const refreshTokenData = localStorage.getItem('refreshToken');
    if (!refreshTokenData) return rejectWithValue('Токен отсутствует');
    try {
      const response = await authApiClient.post<Token, AxiosResponse<Token>, RefreshToken>('auth/refresh', { refreshToken: refreshTokenData });
      const { accessToken, refreshToken } = response.data;
      accessTokenStorage.setToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: unknown) {
      localStorage.removeItem('refreshToken');
      accessTokenStorage.clearToken();
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
)

export const loginUser = createAppAsyncThunk<Token, AuthData, { rejectValue: string }>(
  'authorization/loginUser',
  async (authData, {rejectWithValue}) => {
    try {
      const response = await authApiClient.post<Token, AxiosResponse<Token>, AuthData>('/auth/signin', authData);
      const {accessToken, refreshToken} = response.data;
      accessTokenStorage.setToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  });


const authorizationSlice = createSlice({
  name: 'authorization', initialState: initialStateAuthorization, reducers: {
    logout: (state) => {
      localStorage.removeItem('refreshToken');
      accessTokenStorage.clearToken();
      state.session = {
        data: null,
        error: 'Пользователь вышел из системы',
        errorCounter: 0,
        status: 'rejected'
      };
      state.login = initAsyncParticle<Token>();
    },
  }, extraReducers: (builder) => {
    addAsyncBuilderCases(builder, checkAuthSession, (state) => state.session);
    addAsyncBuilderCases(builder, loginUser, (state) => state.login);
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        authorizationSlice.caseReducers.logout(state);
      });
  },
})

export const { logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;