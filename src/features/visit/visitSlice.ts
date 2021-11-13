import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CreateVisitRequest } from '../../api/dto/request/CreateVisitRequest';
import { Visit } from '../../api/dto/Visit';
import { Optional, OptionalClass } from '../../utils/types';

interface VisitSliceState {
  visit: OptionalClass<Visit>;
  loading: boolean;
}

const initialState: VisitSliceState = {
  visit: Optional.empty<Visit>(),
  loading: false,
};

type CaseReducers = {
  saveVisit: CaseReducer<VisitSliceState, PayloadAction<CreateVisitRequest>>;
  visitSaved: CaseReducer<VisitSliceState, PayloadAction<Visit>>;
  saveVisitError: CaseReducer<VisitSliceState, PayloadAction<any>>;
  loadCurrentVisit: CaseReducer;
  loadCurrentVisitError: CaseReducer<VisitSliceState, PayloadAction<any>>;
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
    },
  },
});

export const {
  saveVisit,
  visitSaved,
  saveVisitError,
  loadCurrentVisit,
  loadCurrentVisitError,
} = visitSlice.actions;

export default visitSlice;
