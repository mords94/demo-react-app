import axios, { AxiosRequestConfig } from 'axios';
import { getAuthorizationToken } from '../utils/jwt';

const BASE_URL = '/';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAuthorizationToken();
    if (token.isPresent()) {
      config.headers = {
        Authorization: `Bearer ${token.get()}`,
        Accept: 'application/json',
      };
    } else {
      config.headers = {};
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

export default api;
