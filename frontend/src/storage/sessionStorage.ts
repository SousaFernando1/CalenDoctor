import { IUser } from 'src/interfaces';
import { getLocalStorageItem, setLocalStorageItem } from 'src/utils';

const TOKEN_KEY = '@event_sell/token';
const REFRESH_TOKEN_KEY = '@event_sell/refresh_token';
const USER_KEY = '@event_sell/user';

export const sessionStorage = {
  setUser: (user: IUser) => {
    setLocalStorageItem(USER_KEY, user);
  },
  getUser: () => getLocalStorageItem(USER_KEY),

  setToken: (token: string) => {
    setLocalStorageItem(TOKEN_KEY, token);
  },
  getToken: () => getLocalStorageItem(TOKEN_KEY),

  clean: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
