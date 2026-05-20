import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../hook/hook";
import apiClient from "../api/apiClient.ts";
import {Profile} from "../types/registration"
import {handleErrorAuthentication} from "../api/apiError.ts"


interface  authState {
  isLoading: boolean;
  error: string | null;
  userProfile: Profile | null;
}

const initialState: authState = {
  isLoading: true,
  error: null,
  userProfile: null,
};

export const getProfileUser = createAppAsyncThunk<Profile, void>(
  'profile/getProfileUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

export const logoutUser = createAppAsyncThunk<void>(
  'logout/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post('/user/logout');
    } catch (error: unknown) {
      return rejectWithValue('что-то пошло не так');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileUser.pending, (state) => {
        state.isLoading = true
        state.error = null;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null;
        state.userProfile = action.payload
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string;
        state.userProfile = null
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = null;
        state.userProfile = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string;
      })
  },
})

export default profileSlice.reducer;