import { useEffect, useState, useImperativeHandle } from 'react';
import List, { ListProps } from './List';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { CrudCaseReducers } from '../../store/generic/createGenericCrudSlice';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { get } from 'lodash';

interface ServerListProps<T> extends Omit<ListProps<T>, 'data'> {
  actions: CaseReducerActions<CrudCaseReducers<T>>;
  stateKey: string;
  listRef?: any;
}

const ROWS = 5;

export interface ListMethods {
  reload: () => void;
}

const ServerList = <T,>({
  children,
  actions,
  stateKey,
  rows: rowsProp = ROWS,
  listRef,
  ...props
}: ServerListProps<T>) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(rowsProp);
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();

  const onPageChange = (e: PaginatorPageState) => {
    console.log(e);
    dispatch(actions.loadData({ page: e.page + 1, size: e.rows }));
    setFirst(e.first);
    setRows(e.rows);
    setPage(e.page + 1);
  };

  useEffect(() => {
    dispatch(actions.loadData({ page: 1, size: rows }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle<ListMethods, ListMethods>(listRef, () => ({
    reload: () => dispatch(actions.loadData({ page, size: rows })),
  }));

  const { data, totalRecords, isListLoading } = useAppSelector((state) =>
    get(state, stateKey)
  );

  return (
    <>
      <List
        {...props}
        data={data}
        paginator={false}
        loading={isListLoading}
        lazy
      >
        {children}
      </List>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 30]}
      />
    </>
  );
};

export default ServerList;
