import {createSlice} from "@reduxjs/toolkit";
import {initialStateUser} from "@/store/initialState/user/initialStateUser";
import {addAsyncBuilderCases} from "@/store/utils";
import {createAppAsyncThunk} from "@/hook/hook";
import {User, UserRequest} from "@/types/users";
import {handleErrorAuthentication} from "@/api/apiError";
import apiClient from "@/api/apiClient";
import {AxiosResponse} from "axios";

interface UpdateUserProps {
  id: string;
  updateUserData: UserRequest;
}

export const getUser = createAppAsyncThunk<User, string, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<User, AxiosResponse<User>, string>(`/admin/users/${id}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const fetchStatus = getState().user.user.status
      if (fetchStatus === 'pending') {
        return false
      }
    },
  },
);

export const updateUser = createAppAsyncThunk<User, UpdateUserProps, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'user/updateUser',
  async ({ id, updateUserData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put<User, AxiosResponse<User>, UserRequest>(`/admin/users/${id}`, updateUserData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, getUser, (state) => state.user);
    addAsyncBuilderCases(builder, updateUser, (state) => state.updateUser);
  },
})

export default userSlice.reducer;