import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../../hook/hook.ts";
import apiClient from "../../../api/apiClient.ts";
import {Profile} from "../../../types/auth.ts"
import {handleErrorAuthentication} from "../../../api/apiError.ts"
import {AxiosResponse} from "axios";
import {initialState} from "../../initialState/initialStateProfile/initialStateProfile.ts";
import {addAsyncBuilderCases} from "../../utils.ts";

export const getProfileUser = createAppAsyncThunk<Profile, void>(
  'profile/getProfileUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Profile, AxiosResponse<Profile>, void>('/user/profile');
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

export const logoutUser = createAppAsyncThunk<void>(
  'profile/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post<void>('/user/logout');
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, getProfileUser, (state) => state.profile);
    addAsyncBuilderCases(builder, logoutUser, (state) => state.logout);
  },
})

export default profileSlice.reducer;