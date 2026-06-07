import {createSlice} from "@reduxjs/toolkit";
import {initialStateUser} from "../../initialState/user/initialStateUser.ts";
import {addAsyncBuilderCases} from "../../utils.ts";
import {createAppAsyncThunk} from "../../../hook/hook.ts";
import {User, UserRequest} from "../../../types/users.ts";
import {handleErrorAuthentication} from "../../../api/apiError.ts";
import apiClient from "../../../api/apiClient.ts";
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
  }
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