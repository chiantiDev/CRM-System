import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "@/hook/hook";
import apiClient from "@/api/apiClient";
import {Profile} from "@/types/auth"
import {handleErrorAuthentication} from "@/api/apiError"
import {AxiosResponse} from "axios";
import {initialState} from "@/store/initialState/profile/initialStateProfile";
import {addAsyncBuilderCases} from "@/store/utils";

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