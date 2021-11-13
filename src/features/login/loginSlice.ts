import { User } from '../../api/dto/User';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Optional, OptionalClass } from '../../utils/types';

interface LoginState {
  loading: boolean;
  user: OptionalClass<User>;
}

const initialState = {
  loading: false,
  user: Optional.empty<User>(),
};

type LoginCredentials = { email: string; password: string };

type LoginCaseReducers = {
  signIn: CaseReducer<LoginState, PayloadAction<LoginCredentials>>;
  signOut: CaseReducer;
  signedOut: CaseReducer;
  signOutError: CaseReducer;
  signInError: CaseReducer;
  loadProfileError: CaseReducer<LoginState, PayloadAction<any>>;
  updateProfileError: CaseReducer<LoginState, PayloadAction<any>>;
  updateProfile: CaseReducer<LoginState, PayloadAction<Partial<User>>>;
  loadProfile: CaseReducer;
  signedIn: CaseReducer<LoginState, PayloadAction<User>>;
};

const loginSlice = createSlice<LoginState, LoginCaseReducers, 'login'>({
  name: 'login',
  initialState,
  reducers: {
    signIn(state) {
      state.loading = true;
    },
    signOut() {},
    signedOut(state) {
      state.user = Optional.empty<User>();
    },
    signedIn(state, { payload }) {
      state.user = Optional<User>(payload);
      state.loading = false;
    },
    signInError(state) {
      state.loading = false;
    },
    signOutError() {},
    loadProfile(state) {
      state.loading = true;
    },
    loadProfileError(state, { payload }) {
      state.loading = false;
    },
    updateProfileError(state, { payload }) {
      state.loading = false;
    },
    updateProfile(state, { payload }) {
      state.loading = true;
    },
  },
});

export const {
  signIn,
  signOut,
  signedOut,
  signedIn,
  signInError,
  signOutError,
  loadProfile,
  loadProfileError,
  updateProfile,
  updateProfileError,
} = loginSlice.actions;

export default loginSlice;
