import {asyncParticle, initAsyncParticle} from "@/store/utils";

export interface registrationState {
  registration: asyncParticle<void>;
}

export const initialState: registrationState = {
  registration: initAsyncParticle<void>(),
};