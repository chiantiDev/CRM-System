import {createAppAsyncThunk} from "@/hook/hook";
import apiClient from "@/api/apiClient";
import {handleErrorAuthentication} from "@/api/apiError";
import {createSlice} from "@reduxjs/toolkit";
import {initialStateUsers} from "@/store/initialState/users/initialStateUsers";
import {addAsyncBuilderCases} from "@/store/utils";
import {AxiosResponse} from "axios";
import {UserFilters, User, MetaResponse, UserRolesRequest} from "@/types/users";

interface EditRolesUserProps {
  id: number;
  roles: UserRolesRequest;
}

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

export const deleteUser = createAppAsyncThunk<void, number, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'users/deleteUser',
  async (id, {rejectWithValue}) => {
    try {
      await apiClient.delete<void, AxiosResponse<void>, number>( `/admin/users/${id}`)
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
)

export const blockedUser = createAppAsyncThunk<void, number, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'users/blockedUser',
    async (id, { rejectWithValue }) => {
    try {
      await apiClient.post<void, AxiosResponse<void>, number>( `/admin/users/${id}/block`)
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
    }
)

export const unblockedUser = createAppAsyncThunk<void, number, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'users/unblockedUser',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.post<void, AxiosResponse<void>, number>( `/admin/users/${id}/unblock`)
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
)

export const editRolesUser = createAppAsyncThunk<void, EditRolesUserProps, { rejectValue: ReturnType<typeof handleErrorAuthentication> }>(
  'users/editRolesUser',
  async ({ id, roles }, { rejectWithValue }) => {
    try {
      await apiClient.post<void, AxiosResponse<void>, UserRolesRequest>( `/admin/users/${id}/rights`, roles)
    } catch (error: unknown) {
      return rejectWithValue(handleErrorAuthentication(error));
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, getUsers, (state) => state.users);
    addAsyncBuilderCases(builder, deleteUser, (state) => state.deleteUser)
    addAsyncBuilderCases(builder, blockedUser, (state) => state.blockedUser)
    addAsyncBuilderCases(builder, unblockedUser, (state) => state.unblockedUser)
    addAsyncBuilderCases(builder, editRolesUser, (state) => state.editRolesUser)
  },
})

export default usersSlice.reducer;