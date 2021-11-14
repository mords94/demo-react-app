import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CreateVisitRequest } from '../../api/dto/request/CreateVisitRequest';
import { UpdateVisitRequest } from '../../api/dto/request/UpdateVisitRequest';
import { Visit } from '../../api/dto/Visit';
import { Optional, OptionalClass } from '../../utils/types';

interface VisitSliceState {
  visit: OptionalClass<Visit>;
  visits: Array<Visit>;
  loading: boolean;
  listLoading: boolean;
}

const initialState: VisitSliceState = {
  visit: Optional.empty<Visit>(),
  visits: [],
  loading: false,
  listLoading: false,
};

type CaseReducers = {
  dataLoaded: CaseReducer<VisitSliceState, PayloadAction<Visit[]>>;
  dataLoadError: CaseReducer<VisitSliceState, PayloadAction<any>>;
  finishVisit: CaseReducer<VisitSliceState, PayloadAction<UpdateVisitRequest>>;
  finishVisitCommitted: CaseReducer;
  finishVisitError: CaseReducer<VisitSliceState, PayloadAction<any>>;
  loadCurrentVisit: CaseReducer;
  loadCurrentVisitError: CaseReducer<VisitSliceState, PayloadAction<any>>;
  resetVisit: CaseReducer;
  saveVisit: CaseReducer<VisitSliceState, PayloadAction<CreateVisitRequest>>;
  saveVisitError: CaseReducer<VisitSliceState, PayloadAction<any>>;
  loadData: CaseReducer;
  visitSaved: CaseReducer<VisitSliceState, PayloadAction<Visit>>;
};

const visitSlice = createSlice<VisitSliceState, CaseReducers, 'visit'>({
  name: 'visit',
  initialState,
  reducers: {
    saveVisit: (state) => {
      state.loading = true;
    },
    visitSaved: (state, { payload }) => {
      state.visit = Optional<Visit>(payload);
      state.loading = false;
    },
    saveVisitError: (state, { payload }) => {
      state.loading = false;
      state.visit = Optional<Visit>(payload);
    },
    loadCurrentVisit: (state) => {
      state.loading = true;
    },
    loadCurrentVisitError: (state) => {
      state.loading = false;
      state.visit = initialState.visit;
    },
    finishVisit: (state) => {
      state.loading = true;
    },
    finishVisitCommitted: (state) => {
      state.loading = false;
      state.visit = Optional.empty<Visit>();
    },
    finishVisitError: (state) => {
      state.loading = false;
    },
    resetVisit: (state) => {
      state.visit = initialState.visit;
    },
    loadData: (state) => {
      state.listLoading = true;
    },
    dataLoaded: (state, { payload }) => {
      state.listLoading = false;
      state.visits = payload;
    },
    dataLoadError: (state) => {
      state.listLoading = false;
    },
  },
});

export const {
  dataLoaded,
  dataLoadError,
  finishVisit,
  finishVisitCommitted,
  finishVisitError,
  loadCurrentVisit,
  loadCurrentVisitError,
  loadData,
  resetVisit,
  saveVisit,
  saveVisitError,
  visitSaved,
} = visitSlice.actions;

export default visitSlice;
