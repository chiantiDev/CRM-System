import {IAsyncParticle, initAsyncParticle} from "@/store/utils";
import {Profile} from "@/types/auth";

export interface ProfileState {
  profile: IAsyncParticle<Profile>;
  logout: IAsyncParticle<void>;
}

export const initialState: ProfileState = {
  profile: initAsyncParticle<Profile>(),
  logout: initAsyncParticle<void>(),
};