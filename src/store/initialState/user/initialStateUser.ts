import { asyncParticle, initAsyncParticle } from "@/store/utils";
import {User} from "@/types/users";

export interface userState {
  user: asyncParticle<User>;
  updateUser: asyncParticle<User>;
}

export const initialStateUser: userState = {
  user: initAsyncParticle<User>(),
  updateUser: initAsyncParticle<User>(),
};