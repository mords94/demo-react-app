import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducers, rootEpics, history } from './root';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: [routerMiddleware(history), epicMiddleware],
});

epicMiddleware.run(rootEpics);

export { history } from './root';
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
