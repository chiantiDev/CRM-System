import { IAsyncParticle, initAsyncParticle } from "../../utils.ts";
import {User} from "../../../types/users.ts";

export interface userState {
  user: IAsyncParticle<User>;
  updateUser: IAsyncParticle<User>;
}

export const initialStateUser: userState = {
  user: initAsyncParticle<User>(),
  updateUser: initAsyncParticle<User>(),
};