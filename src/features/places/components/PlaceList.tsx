import { Column } from 'primereact/column';
import React, { useEffect, useRef } from 'react';
import { Place } from '../../../api/dto/Place';
import List from '../../../components/crud/List';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import placeSlice, { loadPlaces } from '../placeSlice';
import {
  ActionBody,
  CreateOrUpdateDialog,
  CreateOrUpdateDialogMethods,
  CrudProps,
} from '../../../components/crud/index';
import CreateButton from '../../../components/crud/CreateButton';
import { Field, yup } from '../../../components/form';
import { useReduxEffect } from 'use-redux-effect';

const STATE_KEY = 'place';

const placeSchema = {
  id: yup.string(),
  name: yup.string().required('Place name is required'),
  address: yup.object().shape({
    city: yup.string().required('City is required'),
    addressLine: yup.string().required('Address line is required'),
  }),
};

const PlaceList: React.FC<CrudProps> = ({ rows, update, create }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const { data } = useAppSelector((state) => state.place);

  const dialogRef = useRef<CreateOrUpdateDialogMethods<Place>>(null);

  const actionBodyTemplate = (rowData: Place) =>
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
      dispatch(placeSlice.actions.loadData());
    },
    [
      placeSlice.actions.createEntitySuccess.toString(),
      placeSlice.actions.updateEntitySuccess.toString(),
    ],
    []
  );

  return (
    <>
      {create && (
        <CreateButton
          label="Create a place"
          onClick={() => dialogRef.current?.open()}
        />
      )}
      <List<Place> data={data} rows={rows}>
        <Column field="id" header="#" />
        <Column field="name" header="Name" />
        <Column field="address.city" header="City" />
        <Column field="address.addressLine" header="Address" />
        <Column body={actionBodyTemplate} />
      </List>

      <CreateOrUpdateDialog<Place>
        actions={placeSlice.actions}
        schema={placeSchema}
        stateKey={STATE_KEY}
        dialogRef={dialogRef}
      >
        <Field name="name" label="Name*" />
        <Field name="address.city" label="City*" />
        <Field name="address.addressLine" label="Address line*" />
      </CreateOrUpdateDialog>
    </>
  );
};

export default PlaceList;
