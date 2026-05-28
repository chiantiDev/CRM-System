import { IAsyncParticle, initAsyncParticle } from "../../utils.ts";
import { Token } from "../../../types/auth.ts";

export interface AuthState {
  session: IAsyncParticle<Token>;
  login: IAsyncParticle<Token>;
}

export const initialStateAuthorization: AuthState = {
  session: initAsyncParticle<Token>(),
  login: initAsyncParticle<Token>(),
};