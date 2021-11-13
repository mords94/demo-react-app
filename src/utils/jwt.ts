import { Optional } from './types';

export const TOKEN_KEY = 'authToken';

export const setAuthorizationToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthorizationToken = () =>
  Optional<string>(localStorage.getItem(TOKEN_KEY));

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
