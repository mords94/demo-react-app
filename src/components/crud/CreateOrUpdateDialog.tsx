import { Button } from 'primereact/button';
import React, { ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler, DefaultValues } from 'react-hook-form';
import Dialog, {
  DialogMethods,
  DialogProps,
} from '../../components/common/Dialog';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { CrudCaseReducers } from '../../store/generic/createGenericCrudSlice';
import { isNullOrUndefined } from '../../utils/types';
import { MutableRefObject } from 'hoist-non-react-statics/node_modules/@types/react';
import { SchemaType, Form, FormMethods } from '../form';
import { get } from 'lodash';

type DialogRef<T> =
  | ((instance: CreateOrUpdateDialogMethods<T> | null) => void)
  | MutableRefObject<CreateOrUpdateDialogMethods<T> | null>
  | null;

interface CreateOrUpdateDialogProps<T> {
  dialogProps?: Partial<DialogProps>;
  actions: CaseReducerActions<CrudCaseReducers<T>>;
  children?: ReactNode;
  schema: SchemaType<T>;
  stateKey: string;
  dialogRef: DialogRef<T>;
}

export interface CreateOrUpdateDialogMethods<T> {
  open: (d?: DefaultValues<T>) => void;
  close: () => void;
}

const CreateOrUpdateDialog = <T,>({
  actions,
  dialogProps = {},
  children = null,
  schema,
  stateKey,
  dialogRef: crudRef,
}: CreateOrUpdateDialogProps<T>): JSX.Element => {
  const dispatch = useAppDispatch();

  const formRef = useRef<FormMethods<T>>(null);
  const dialogRef = useRef<DialogMethods>(null);
  const [isCreate, setIsCreate] = useState(true);
  const [defaults, setDefaults] = useState<DefaultValues<T>>(
    {} as DefaultValues<T>
  );

  const { isLoading } = useAppSelector((state) => get(state, stateKey));

  const onSubmit: SubmitHandler<T> = (data) => {
    if (isCreate) {
      dispatch(actions.createEntityLoading(data));
    } else {
      dispatch(actions.updateEntityLoading({ ...defaults, ...data }));
    }
  };

  useImperativeHandle(
    crudRef,
    () => ({
      open(defaultValues?: DefaultValues<T>) {
        if (!isNullOrUndefined(defaultValues)) {
          setDefaults(defaultValues);
        }
        setIsCreate(isNullOrUndefined(defaultValues));
        dialogRef.current?.open();
      },

      close() {
        dialogRef.current?.close();
      },
    }),
    []
  );

  return (
    <Dialog
      {...dialogProps}
      ref={dialogRef}
      id="dialogProps"
      header={`${isCreate ? 'Create' : 'Edit'} ${stateKey}`}
    >
      <Form<T>
        schema={schema}
        formRef={formRef}
        onSubmit={onSubmit}
        defaultValues={defaults}
        className="p-fluid"
      >
        {children}

        <Button
          type="submit"
          label="Save"
          className="my-4"
          loading={isLoading}
        />
      </Form>
    </Dialog>
  );
};

export default CreateOrUpdateDialog;
