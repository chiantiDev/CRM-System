import { IAsyncParticle, initAsyncParticle } from "../../utils.ts";

export interface registrationState {
  registration: IAsyncParticle<void>;
}

export const initialState: registrationState = {
  registration: initAsyncParticle<void>(),
};