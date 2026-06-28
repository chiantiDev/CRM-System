import { asyncParticle, initAsyncParticle } from "@/store/utils";
import {MetaResponse, User} from "@/types/users";

export interface usersState {
  users: asyncParticle<MetaResponse<User>>;
  deleteUser: asyncParticle<void>;
  blockedUser: asyncParticle<void>;
  unblockedUser: asyncParticle<void>;
  editRolesUser: asyncParticle<void>;
}

export const initialStateUsers: usersState = {
  users: initAsyncParticle<MetaResponse<User>>(),
  deleteUser: initAsyncParticle<void>(),
  blockedUser: initAsyncParticle<void>(),
  unblockedUser: initAsyncParticle<void>(),
  editRolesUser: initAsyncParticle<void>(),
};