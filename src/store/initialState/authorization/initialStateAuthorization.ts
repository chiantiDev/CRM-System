import {asyncParticle, initAsyncParticle} from "@/store/utils";
import {Token} from "@/types/auth";

export interface AuthState {
  session: asyncParticle<Token>;
  login: asyncParticle<Token>;
}

export const initialStateAuthorization: AuthState = {
  session: initAsyncParticle<Token>(),
  login: initAsyncParticle<Token>(),
};