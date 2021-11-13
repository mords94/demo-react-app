import { Place } from '../../api/dto/Place';
import createGenericCrudSlice from '../../store/generic/createGenericCrudSlice';

const placeSlice = createGenericCrudSlice<Place>({ name: 'place' });

export const {
  loadData: loadPlaces,
  fetchEntityLoading,
  createEntityLoading,
  updateEntityLoading,
} = placeSlice.actions;

export default placeSlice;
