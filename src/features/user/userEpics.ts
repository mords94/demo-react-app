import { AxiosResponse } from 'axios';
import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import api from '../../api/api';
import { ProfileResponse } from '../../api/dto/response/ProfileResponse';
import {
  signedIn,
  loadProfileError,
  loadProfile,
  updateProfileError,
  updateProfile,
} from '../login/loginSlice';
import { toast } from '../toast/toastService';

const getProfileEpic = (action$: any) =>
  action$.pipe(
    ofType(loadProfile.toString()),
    switchMap(() =>
      from(api.get('/user/profile')).pipe(
        map((response: AxiosResponse<ProfileResponse>) => {
          toast.success(
            `Welcome back ${response.data.personDetails.firstName}`,
            'Hey!'
          );

          return signedIn(response.data);
        }),
        catchError((error) => of(loadProfileError(error)))
      )
    )
  );

const updateProfileEpic = (action$: any) =>
  action$.pipe(
    ofType(updateProfile.toString()),
    switchMap(({ payload: user }) =>
      from(api.patch('/user/profile', user)).pipe(
        map((response: AxiosResponse<ProfileResponse>) => {
          toast.success('Profile has been saved');
          return signedIn(response.data);
        }),
        catchError((error) => of(updateProfileError(error)))
      )
    )
  );

export default combineEpics(updateProfileEpic, getProfileEpic);
