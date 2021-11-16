import { ColumnProps } from 'primereact/column';
import { DataTable, DataTableProps } from 'primereact/datatable';
import React from 'react';

export interface ListProps<T> extends DataTableProps {
  data: Array<T>;
  children: React.ReactElement<ColumnProps> | React.ReactElement<ColumnProps>[];
}

const List = <T,>({ data, children, rows = 5, ...props }: ListProps<T>) => {
  return (
    <DataTable
      value={data}
      responsiveLayout="scroll"
      paginator
      rows={rows}
      rowsPerPageOptions={[5, 10, 30]}
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      {...props}
    >
      {children}
    </DataTable>
  );
};

export default List;
