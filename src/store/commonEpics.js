import {
  catchError,
  filter,
  ignoreElements,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { from, merge, of } from 'rxjs';
import { isFunction } from 'lodash';

import { getReasonPhrase } from 'http-status-codes';
import api from '../api/api';

const defaultServerAction = (errorMessages) =>
  of({ type: 'SERVER_ERROR', payload: errorMessages });

const defaultParamResolver = (params) =>
  Array.isArray(params) ? params : [params];
const defaultGetState = () => {};

export const catchError$ =
  (errorAction, setServerErrors = defaultServerAction) =>
  (error, caught) => {
    const { response: { status } = { status: null } } = error;

    const message = status ? getReasonPhrase[status] : error.message;

    let actionStream = [
      of(isFunction(errorAction) ? errorAction(message) : errorAction),
    ];

    if (status === 500) {
      const {
        response: { data: { error: errorMessage } } = {
          data: { errors: [], error: 'Unknown error' },
        },
      } = error;
      if (errorMessage && typeof errorMessage === 'string') {
        actionStream.push(of(errorAction(errorMessage)));
      }
    }

    if (status === 422) {
      const {
        response: { data: { errors: errorMessages, error: errorMessage } } = {
          data: { errors: [], error: 'Validation error' },
        },
      } = error;
      if (errorMessages) {
        actionStream.push(of(errorAction(errorMessage)));
      }

      if (errorMessage && typeof errorMessage === 'string') {
        actionStream.push(of(errorAction(errorMessage)));
      }
    }

    actionStream.push(caught);

    return merge(...actionStream);
  };

const fetchEntity$ =
  ({
    fetchEntityError,
    fetchEntityLoading,
    fetchEntitySuccess,
    resolveUrl,
    resolveParams = defaultParamResolver,
  }) =>
  (action$) =>
    action$.pipe(
      filter(fetchEntityLoading.match),
      switchMap(({ payload }) =>
        from(api.get(resolveUrl(payload), ...resolveParams(payload))).pipe(
          map((response) => response.data)
        )
      ),
      map(fetchEntitySuccess),
      catchError(catchError$(fetchEntityError))
    );

const fetchEntityList$ =
  ({
    loadData,
    dataLoadError,
    dataLoaded,
    resolveUrl,
    resolveParams = defaultParamResolver,
    dataTransformer = (data) => data,
  }) =>
  (action$) =>
    action$.pipe(
      filter(loadData.match),
      switchMap(({ payload }) =>
        from(api.get(resolveUrl(payload), ...resolveParams(payload))).pipe(
          map((response) => {
            return response.data;
          })
        )
      ),
      map(dataTransformer),
      map(dataLoaded),
      catchError(catchError$(dataLoadError))
    );

const createEntityEpic$ =
  ({
    createEntityError,
    createEntityLoading,
    createEntitySuccess,
    resolveUrl,
    resolveParams = defaultParamResolver,
  }) =>
  (action$) =>
    action$.pipe(
      filter(createEntityLoading.match),
      switchMap(({ payload: params } = {}) =>
        from(api.post(resolveUrl(params), ...resolveParams(params))).pipe(
          map((response) => ({ ...params, ...response.data }))
        )
      ),
      mergeMap((data) => [
        createEntitySuccess(data),
        {
          type: 'CLOSE_CREATE_MODAL',
        },
      ]),
      catchError(catchError$(createEntityError))
    );

const updateEntityEpic$ =
  ({
    updateEntityError,
    updateEntityLoading,
    updateEntitySuccess,
    resolveUrl,
    resolveParams = defaultParamResolver,
  }) =>
  (action$) =>
    action$.pipe(
      filter(updateEntityLoading.match),
      switchMap(
        ({
          payload: { closeAfterSave, ...params } = { closeAfterSave: false },
        }) =>
          from(api.patch(resolveUrl(params), ...resolveParams(params))).pipe(
            map((response) => ({ closeAfterSave, ...response.data }))
          )
      ),
      map(updateEntitySuccess),
      catchError(catchError$(updateEntityError))
    );

const deleteEntity$ =
  ({
    deleteEntityLoading,
    deleteEntityError,
    deleteEntitySuccess,
    resolveUrl,
    resolveParams = defaultParamResolver,
  }) =>
  (action$, state$) =>
    action$.pipe(
      filter(deleteEntityLoading.match),
      switchMap(({ payload }) =>
        from(api.delete(resolveUrl(payload), ...resolveParams(payload))).pipe(
          map(() => deleteEntitySuccess()),
          catchError(catchError$(deleteEntityError))
        )
      )
    );

const createRedirectEpic$ = (action, resolveRedirect) => (action$) =>
  action$.pipe(
    filter(action.match),
    tap(({ payload }) => {
      resolveRedirect(payload);
    }),
    ignoreElements()
  );

export {
  fetchEntity$,
  fetchEntityList$,
  deleteEntity$,
  createRedirectEpic$,
  createEntityEpic$,
  updateEntityEpic$,
};
