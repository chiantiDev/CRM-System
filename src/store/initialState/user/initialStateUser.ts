import { IAsyncParticle, initAsyncParticle } from "@/store/utils";
import {User} from "@/types/users";

export interface userState {
  user: IAsyncParticle<User>;
  updateUser: IAsyncParticle<User>;
}

export const initialStateUser: userState = {
  user: initAsyncParticle<User>(),
  updateUser: initAsyncParticle<User>(),
};