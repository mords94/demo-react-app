import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Optional, OptionalClass } from '../../utils/types';

interface InitialState<Entity> {
  entity: OptionalClass<Entity>;
  data: Entity[];
  isListLoading: boolean;
  isUpdateSuccess: boolean;
  isCreateSuccess: boolean;
  isLoading: boolean;
  error: OptionalClass<any>;
}

type CaseReducers<Entity> = {
  createEntityLoading: CaseReducer;
  createEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  createEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  fetchEntityLoading: CaseReducer;
  fetchEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  fetchEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  loadData: CaseReducer;
  dataLoaded: CaseReducer<InitialState<Entity>, PayloadAction<Entity[]>>;
  dataLoadError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  updateEntityLoading: CaseReducer;
  updateEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  updateEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
};

const createEntityMutationTemplateSlice = <
  Entity,
  Name extends string = string
>({
  name,
}: {
  name: Name;
}) => {
  const mutationInitialState: InitialState<Entity> = {
    entity: Optional.empty<Entity>(),
    data: [],
    isListLoading: false,
    isUpdateSuccess: false,
    isCreateSuccess: false,
    isLoading: false,
    error: Optional.empty(),
  };

  return createSlice<InitialState<Entity>, CaseReducers<Entity>, Name>({
    name,
    initialState: mutationInitialState,
    reducers: {
      createEntityLoading: (state) => {
        state.isLoading = true;
        state.isUpdateSuccess = false;
      },
      createEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.isCreateSuccess = true;
        state.error = Optional.empty();
        state.entity = Optional<Entity>(payload);
      },
      createEntityError: (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isCreateSuccess = false;
      },
      fetchEntityLoading: (state) => {
        state.isLoading = true;
        state.isUpdateSuccess = false;
        state.error = Optional.empty();
        state.entity = Optional.empty<Entity>();
      },
      fetchEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.isUpdateSuccess = false;
        state.error = Optional.empty();
        state.entity = Optional<Entity>(payload);
      },
      fetchEntityError: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
      loadData: (state) => {
        state.isListLoading = true;
        state.error = Optional.empty();
      },
      dataLoaded: (state, { payload }) => {
        state.isListLoading = false;
        state.data = (payload as any) ?? [];
      },
      dataLoadError: (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      },
      updateEntityLoading: (state) => {
        state.isLoading = true;
        state.isUpdateSuccess = false;
        state.error = Optional.empty();
      },
      updateEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        state.error = Optional.empty();
        state.entity = Optional<Entity>(payload);
      },
      updateEntityError: (state, { payload }) => {
        state.isLoading = false;
        state.isUpdateSuccess = false;
        state.error = payload;
      },
    },
  });
};

export default createEntityMutationTemplateSlice;
