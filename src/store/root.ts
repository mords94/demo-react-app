import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { actionReducer } from 'use-redux-effect';
import guestEpics from '../features/guest/guestEpics';
import guestSlice from '../features/guest/guestSlice';
import loginEpics from '../features/login/loginEpics';
import loginSlice from '../features/login/loginSlice';
import placeEpics from '../features/places/placeEpics';
import placeSlice from '../features/places/placeSlice';
import userEpics from '../features/user/userEpics';
import adminVisitSlice from '../features/visit/adminVisitSlice';
import visitEpics from '../features/visit/visitEpics';
import visitSlice from '../features/visit/visitSlice';

export const history = createBrowserHistory();

export const rootReducers = combineReducers({
  router: connectRouter(history),
  action: actionReducer,
  login: loginSlice.reducer,
  visit: visitSlice.reducer,
  place: placeSlice.reducer,
  guest: guestSlice.reducer,
  adminVisit: adminVisitSlice.reducer,
});

export const rootEpics = combineEpics(
  loginEpics,
  userEpics,
  visitEpics,
  placeEpics,
  guestEpics
);
