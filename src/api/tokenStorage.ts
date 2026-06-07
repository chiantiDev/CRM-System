import {TokenStorage} from "@/types/auth";

// const createTokenStorage = (): TokenStorage => {
//   let accessToken: string | null = null;
//
//   return {
//     setToken: (newToken) => { accessToken = newToken; },
//     getToken: () => accessToken,
//     clearToken: () => { accessToken = null; },
//   };
// };
// export const accessTokenStorage = createTokenStorage();

class createTokenStorage implements TokenStorage {
  static #instance: createTokenStorage | null = null;
  #accessToken: string | null = null;

  constructor() {
    if (createTokenStorage.#instance) {
      return createTokenStorage.#instance;
    }
    createTokenStorage.#instance = this;
  }

  public setToken(newToken: string) {
    this.#accessToken = newToken;
  }

  public getToken() {
    return this.#accessToken;
  }

  public clearToken() {
    this.#accessToken = null;
  }
}

const tokenStorage = new createTokenStorage();
Object.freeze(tokenStorage);

export const accessTokenStorage = tokenStorage;
