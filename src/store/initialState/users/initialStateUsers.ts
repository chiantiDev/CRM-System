import { IAsyncParticle, initAsyncParticle } from "@/store/utils";
import {MetaResponse, User} from "@/types/users";

export interface usersState {
  users: IAsyncParticle<MetaResponse<User>>;
  deleteUser: IAsyncParticle<void>;
}

export const initialStateUsers: usersState = {
  users: initAsyncParticle<MetaResponse<User>>(),
  deleteUser: initAsyncParticle<void>(),
};