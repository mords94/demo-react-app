import guestSlice from './guestSlice';
import {
  fetchEntityList$,
  createEntityEpic$,
  updateEntityEpic$,
} from '../../store/commonEpics';
import { combineEpics } from 'redux-observable';
import { Guest } from '../../api/dto/User';

const loadGuestsEpic = fetchEntityList$({
  ...guestSlice.actions,
  resolveUrl: () => '/api/guest',
  resolveParams: (params) => [{ params }],
});

const createGuestEpic = createEntityEpic$({
  ...guestSlice.actions,
  resolveUrl: () => `/api/guest`,
});

const updateGuestEpic = updateEntityEpic$({
  ...guestSlice.actions,
  resolveUrl: ({ id }: Guest) => `/api/guest/${id}`,
});

export default combineEpics(loadGuestsEpic, createGuestEpic, updateGuestEpic);
