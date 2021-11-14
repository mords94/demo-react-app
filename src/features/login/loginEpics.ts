import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import api from '../../api/api';
import { AuthenticateResponse } from '../../api/dto/response/AuthenticateResponse';
import { clearToken, setAuthorizationToken } from '../../utils/jwt';
import { toast } from '../toast/toastService';
import { isStatus } from '../../utils/error';
import { StatusCodes } from 'http-status-codes';
import {
  signedIn,
  signedOut,
  signIn,
  signInError,
  signOut,
  signOutError,
} from './loginSlice';
import { loadCurrentVisit, resetVisit } from '../visit/visitSlice';

const loginEpic = (action$: any) =>
  action$.pipe(
    ofType(signIn.toString()),
    switchMap(({ payload }) =>
      from(api.post('/authenticate', payload)).pipe(
        map((response: AxiosResponse<AuthenticateResponse>) => {
          setAuthorizationToken(response.data.token);
          localStorage.setItem('login', 'false');
          toast.success('Successfully logged in');
          return signedIn(response.data.user);
        }),
        catchError((error) => {
          if (isStatus(error, StatusCodes.UNAUTHORIZED)) {
            toast.error('Invalid credentials');
          }
          return of(signInError());
        })
      )
    )
  );

const loggedInEpic = (action$: any) =>
  action$.pipe(ofType(signedIn.toString()), map(loadCurrentVisit));

const logOutEpic = (action$: any) =>
  action$.pipe(
    ofType(signOut.toString()),
    tap(() => {
      toast.info('Logged out');
      clearToken();
    }),
    map(() => signedOut()),
    catchError(() => of(signOutError()))
  );

const logOutHandledEpic = (action$: any) =>
  action$.pipe(
    ofType(signedOut.toString()),
    mergeMap(() => [push('/'), resetVisit()])
  );

export default combineEpics(
  loginEpic,
  logOutEpic,
  logOutHandledEpic,
  loggedInEpic
);
