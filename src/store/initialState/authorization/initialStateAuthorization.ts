import {asyncParticle, initAsyncParticle} from "@/store/utils";
import {Token} from "@/types/auth";

export interface AuthState {
  authorization: asyncParticle<Token>;
  login: asyncParticle<Token>;
}

export const initialStateAuthorization: AuthState = {
  authorization: initAsyncParticle<Token>(),
  login: initAsyncParticle<Token>(),
};