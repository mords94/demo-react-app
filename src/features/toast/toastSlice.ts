import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ToastMessage } from 'primereact/toast';

type ToastInitialState = Record<string, never>;

type CaseReducers = {
  showToast: CaseReducer<ToastInitialState, PayloadAction<ToastMessage>>;
};

const toastSlice = createSlice<ToastInitialState, CaseReducers, 'toast'>({
  name: 'toast',
  initialState: {},
  reducers: {
    showToast: () => {},
  },
});

export const { showToast } = toastSlice.actions;
