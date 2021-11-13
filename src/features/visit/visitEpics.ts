import { AxiosResponse } from 'axios';
import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import api from '../../api/api';
import { toast } from '../toast/toastService';
import {
  loadCurrentVisit,
  loadCurrentVisitError,
  saveVisit,
  saveVisitError,
  visitSaved,
} from './visitSlice';
import { Visit } from '../../api/dto/Visit';

const saveVisitEpic = (action$: any) =>
  action$.pipe(
    ofType(saveVisit.toString()),
    switchMap(({ payload }: { payload: Visit }) =>
      from(api.post('/visit', payload)).pipe(
        map((response: AxiosResponse<Visit>) => {
          toast.success(
            `Started visit at ${payload.place.name}`,
            new Date().toLocaleTimeString()
          );

          return visitSaved(response.data);
        }),
        catchError((error) => of(saveVisitError(error)))
      )
    )
  );

const loadCurrentVisitEpic = (action$: any) =>
  action$.pipe(
    ofType(loadCurrentVisit.toString()),
    switchMap(() =>
      from(api.get('/visit/current_user')).pipe(
        map((response: AxiosResponse<Visit>) => visitSaved(response.data)),
        catchError((error) => of(loadCurrentVisitError(error)))
      )
    )
  );

export default combineEpics(saveVisitEpic, loadCurrentVisitEpic);
