import { IAsyncParticle, initAsyncParticle } from "../../utils.ts";
import { Profile } from "../../../types/auth.ts";

export interface ProfileState {
  profile: IAsyncParticle<Profile>;
  logout: IAsyncParticle<void>;
}

export const initialState: ProfileState = {
  profile: initAsyncParticle<Profile>(),
  logout: initAsyncParticle<void>(),
};