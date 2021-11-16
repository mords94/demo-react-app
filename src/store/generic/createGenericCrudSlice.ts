import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Page } from '../../api/dto/Page';
import { Optional, OptionalClass, UndefinedOr } from '../../utils/types';

interface Pageable {
  page: number;
  size?: number;
}
interface InitialState<Entity> {
  entity: OptionalClass<Entity>;
  data: Entity[];
  isListLoading: boolean;
  isLoading: boolean;
  isDeleteLoading: boolean;
  error: OptionalClass<any>;
  pageState: Pageable;
  totalRecords: number;
}

export type CrudCaseReducers<Entity> = {
  createEntityLoading: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  deleteEntitySuccess: CaseReducer<InitialState<Entity>>;
  deleteEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  deleteEntityLoading: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  createEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  createEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  fetchEntityLoading: CaseReducer;
  fetchEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  fetchEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  loadData: CaseReducer<
    InitialState<Entity>,
    PayloadAction<UndefinedOr<Pageable>>
  >;
  dataLoaded: CaseReducer<
    InitialState<Entity>,
    PayloadAction<Entity[] | Page<Entity>>
  >;
  dataLoadError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
  updateEntityLoading: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  updateEntitySuccess: CaseReducer<InitialState<Entity>, PayloadAction<Entity>>;
  updateEntityError: CaseReducer<InitialState<Entity>, PayloadAction<any>>;
};

const createEntityMutationTemplateSlice = <
  Entity,
  Name extends string = string
>({
  name,
  paginated = false,
}: {
  name: Name;
  paginated?: boolean;
}) => {
  const mutationInitialState: InitialState<Entity> = {
    entity: Optional.empty<Entity>(),
    data: [],
    isListLoading: false,
    isLoading: false,
    isDeleteLoading: false,
    error: Optional.empty(),
    totalRecords: 0,
    pageState: {
      page: 1,
    },
  };

  return createSlice<InitialState<Entity>, CrudCaseReducers<Entity>, Name>({
    name,
    initialState: mutationInitialState,
    reducers: {
      createEntityLoading: (state) => {
        state.isLoading = true;
      },
      createEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.error = Optional.empty();
        state.entity = Optional<Entity>(payload);
      },
      createEntityError: (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      },
      deleteEntityLoading: (state) => {
        state.isDeleteLoading = true;
      },
      deleteEntitySuccess: (state, { payload }) => {
        state.isDeleteLoading = false;
        state.error = Optional.empty();
      },
      deleteEntityError: (state, { payload }) => {
        state.error = payload;
        state.isDeleteLoading = false;
      },
      fetchEntityLoading: (state) => {
        state.isLoading = true;
        state.error = Optional.empty();
        state.entity = Optional.empty<Entity>();
      },
      fetchEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
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
        if (!paginated) {
          state.data = (payload as any) ?? []; // TODO fix this type error
          state.totalRecords = ((payload as any) ?? []).length; // TODO fix this type error
        }

        if (paginated) {
          const data = payload as Page<Entity>;
          //@ts-ignore
          state.data = (data.content as any) ?? []; //TODO fix this type error
          state.pageState.page = data.pageable.pageNumber;
          state.pageState.size = data.pageable.pageSize;
          state.totalRecords = data.totalElements;
        }

        state.isListLoading = false;
      },
      dataLoadError: (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      },
      updateEntityLoading: (state) => {
        state.isLoading = true;
        state.error = Optional.empty();
      },
      updateEntitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.error = Optional.empty();
        state.entity = Optional<Entity>(payload);
      },
      updateEntityError: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
    },
  });
};

export default createEntityMutationTemplateSlice;
