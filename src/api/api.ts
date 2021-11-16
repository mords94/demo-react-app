import axios, { AxiosRequestConfig } from 'axios';
import { isResponseError } from '../utils/error';
import { getAuthorizationToken } from '../utils/jwt';
import { toast } from '../features/toast/toastService';
import { identity } from 'lodash';

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

api.interceptors.response.use(identity, (error: any) => {
  if (isResponseError(error)) {
    if ([422, 403].includes(error.response?.status as number)) {
      const errorMessage =
        error.response?.data?.message ??
        error.response?.statusText ??
        'Unknown error';

      toast.error(errorMessage);
    }
  }
  Promise.reject(error);
});

export default api;
