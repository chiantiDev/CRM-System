import {asyncParticle, initAsyncParticle} from "@/store/utils";
import {Profile} from "@/types/auth";

export interface ProfileState {
  profile: asyncParticle<Profile>;
  logout: asyncParticle<void>;
}

export const initialState: ProfileState = {
  profile: initAsyncParticle<Profile>(),
  logout: initAsyncParticle<void>(),
};