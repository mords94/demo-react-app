import placeSlice from './placeSlice';
import {
  fetchEntityList$,
  fetchEntity$,
  createEntityEpic$,
  updateEntityEpic$,
} from '../../store/commonEpics';
import { combineEpics } from 'redux-observable';
import { Place } from '../../api/dto/Place';

const loadPlacesEpic = fetchEntityList$({
  ...placeSlice.actions,
  resolveUrl: () => '/api/place',
});

const loadPlaceEpic = fetchEntity$({
  ...placeSlice.actions,
  resolveUrl: ({ id }: Place) => `/api/place/${id}`,
});

const createPlaceEpic = createEntityEpic$({
  ...placeSlice.actions,
  resolveUrl: () => `/api/place`,
});

const updatePlaceEpic = updateEntityEpic$({
  ...placeSlice.actions,
  resolveUrl: ({ id }: Place) => `/api/place/${id}`,
});

export default combineEpics(
  loadPlaceEpic,
  loadPlacesEpic,
  createPlaceEpic,
  updatePlaceEpic
);
