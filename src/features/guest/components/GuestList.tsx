import { Column } from 'primereact/column';
import React, { useRef } from 'react';
import { Guest } from '../../../api/dto/User';
import ServerList, { ListMethods } from '../../../components/crud/ServerList';
import guestSlice from '../guestSlice';
import { ProfileData, profileSchema } from '../../user/UserForm';
import { Field } from '../../../components/form';
import {
  ActionBody,
  CreateOrUpdateDialogMethods,
  CreateOrUpdateDialog,
  CrudProps,
} from '../../../components/crud';
import CreateButton from '../../../components/crud/CreateButton';
import { useReduxEffect } from 'use-redux-effect';

const STATE_KEY = 'guest';

const GuestList: React.FC<CrudProps> = ({ rows, create, update }) => {
  const dialogRef = useRef<CreateOrUpdateDialogMethods<Guest>>(null);
  const listRef = useRef<ListMethods>(null);

  const actionBodyTemplate = (rowData: Guest) =>
    update && (
      <ActionBody
        onEdit={() => {
          dialogRef.current?.open(rowData);
        }}
      />
    );

  useReduxEffect(
    () => {
      dialogRef.current?.close();
      listRef.current?.reload();
    },
    [
      guestSlice.actions.createEntitySuccess.toString(),
      guestSlice.actions.updateEntitySuccess.toString(),
    ],
    []
  );

  return (
    <>
      {create && (
        <CreateButton
          label="Create a guest"
          onClick={() => dialogRef.current?.open()}
        />
      )}

      <ServerList<Guest>
        actions={guestSlice.actions}
        rows={rows}
        stateKey={STATE_KEY}
        listRef={listRef}
      >
        <Column field="id" header="#" />
        <Column field="personDetails.firstName" header="First name" />
        <Column field="personDetails.lastName" header="Last name" />
        <Column field="personDetails.email" header="Phone" />
        <Column
          field="personDetails.phone"
          header={<i className="pi pi-phone" />}
        />
        <Column body={actionBodyTemplate} />
      </ServerList>

      <CreateOrUpdateDialog<ProfileData>
        actions={guestSlice.actions}
        schema={profileSchema}
        stateKey={STATE_KEY}
        dialogRef={dialogRef}
      >
        <Field name="personDetails.firstName" label="First name*" />
        <Field name="personDetails.lastName" label="Last name*" />
        <Field name="personDetails.email" label="E-mail*" />
        <Field name="personDetails.phone" label="Phone*" />
      </CreateOrUpdateDialog>
    </>
  );
};

export default GuestList;
