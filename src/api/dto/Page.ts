export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SortResponse {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortResponse;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
