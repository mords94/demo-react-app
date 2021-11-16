import { Guest } from '../../api/dto/User';
import createGenericCrudSlice from '../../store/generic/createGenericCrudSlice';

const guestSlice = createGenericCrudSlice<Guest>({
  name: 'guest',
  paginated: true,
});

export const {
  loadData: loadGuests,
  fetchEntityLoading,
  createEntityLoading,
  updateEntityLoading,
} = guestSlice.actions;

export default guestSlice;
