import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const isResponseError = (error?: Error): error is AxiosError => {
  return !!(error && error.hasOwnProperty('response'));
};

export const isStatus = (error: Error, statusCode: StatusCodes) => {
  if (!isResponseError(error)) {
    return false;
  }

  return error.response?.status === statusCode;
};
