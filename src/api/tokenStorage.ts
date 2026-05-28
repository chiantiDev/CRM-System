import { TokenStorage } from "../types/auth.ts";

const createTokenStorage = (): TokenStorage => {
  let accessToken: string | null = null;

  return {
    setToken: (newToken) => { accessToken = newToken; },
    getToken: () => accessToken,
    clearToken: () => { accessToken = null; },
  };
};

export const accessTokenStorage = createTokenStorage();