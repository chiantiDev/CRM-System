import {createAppAsyncThunk} from "../../../hook/hook.ts";
import apiClient from "../../../api/apiClient.ts";
import {handleErrorAuthentication} from "../../../api/apiError.ts";
import {createSlice} from "@reduxjs/toolkit";
import {initialStateUsers} from "../../initialState/users/initialStateUsers.ts";
import {addAsyncBuilderCases} from "../../utils.ts";
import {AxiosResponse} from "axios";
import {UserFilters, User, MetaResponse} from "../../../types/users.ts";

export const getUsers = createAppAsyncThunk<MetaResponse<User>, UserFilters, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'users/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<MetaResponse<User>, AxiosResponse<MetaResponse<User>>, UserFilters>(
        '/admin/users', { params }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, getUsers, (state) => state.users);
  },
})

export default usersSlice.reducer;