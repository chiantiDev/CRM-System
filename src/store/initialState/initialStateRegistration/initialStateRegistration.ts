import {IAsyncParticle, initAsyncParticle} from "@/store/utils";

export interface registrationState {
  registration: IAsyncParticle<void>;
}

export const initialState: registrationState = {
  registration: initAsyncParticle<void>(),
};