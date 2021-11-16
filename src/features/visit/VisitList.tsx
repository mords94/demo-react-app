import { Column } from 'primereact/column';
import React, { useRef } from 'react';
import { formatDate, Visit } from '../../api/dto/Visit';
import { ActionBody, CrudProps, ServerList } from '../../components/crud';
import visitSlice, {
  deleteEntityLoading as deleteVisit,
} from './adminVisitSlice';
import { serializePlace } from '../../api/dto/Place';
import { useAppDispatch } from '../../store/hooks';
import { confirmDialog } from 'primereact/confirmdialog';
import { useReduxEffect } from 'use-redux-effect';
import { ListMethods } from '../../components/crud/ServerList';

const STATE_KEY = 'adminVisit';

const VisitList: React.FC<CrudProps> = ({ rows }) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<ListMethods>(null);

  useReduxEffect(
    () => {
      listRef.current?.reload();
    },
    [visitSlice.actions.deleteEntitySuccess.toString()],
    []
  );

  const actionBodyTemplate = (visit: Visit) => (
    <ActionBody
      onDelete={() => {
        confirmDialog({
          message: 'Are you sure you want to remove?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => dispatch(deleteVisit(visit)),
          reject: () => {},
        });
      }}
    />
  );

  return (
    <ServerList<Visit>
      actions={visitSlice.actions}
      rows={rows}
      stateKey={STATE_KEY}
      listRef={listRef}
    >
      <Column field="id" header="#" />
      <Column
        field="place"
        header="Place"
        body={(data) => serializePlace(data.place)}
      />
      <Column
        field="visitDate"
        header="Visit date"
        body={(data) => formatDate(data.visitDate)}
      />
      <Column
        field="finishDate"
        header="Finish date"
        body={(data) => formatDate(data.finishDate)}
      />

      <Column body={actionBodyTemplate} />
    </ServerList>
  );
};

export default VisitList;
