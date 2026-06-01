import { IAsyncParticle, initAsyncParticle } from "../../utils.ts";
import {MetaResponse, User} from "../../../types/users.ts";

export interface usersState {
  users: IAsyncParticle<MetaResponse<User>>;
}

export const initialStateUsers: usersState = {
  users: initAsyncParticle<MetaResponse<User>>(),
};