import { Visit } from '../../api/dto/Visit';
import createGenericCrudSlice from '../../store/generic/createGenericCrudSlice';

const adminVisitSlice = createGenericCrudSlice<Visit>({
  name: 'adminVisit',
  paginated: true,
});

export const {
  loadData,
  deleteEntityLoading,
  fetchEntityLoading,
  createEntityLoading,
  updateEntityLoading,
} = adminVisitSlice.actions;

export default adminVisitSlice;
