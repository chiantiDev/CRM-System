import {IAsyncParticle, initAsyncParticle} from "@/store/utils";
import {Token} from "@/types/auth";

export interface AuthState {
  session: IAsyncParticle<Token>;
  login: IAsyncParticle<Token>;
}

export const initialStateAuthorization: AuthState = {
  session: initAsyncParticle<Token>(),
  login: initAsyncParticle<Token>(),
};