import { Button } from 'primereact/button';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Dialog, { DialogMethods } from '../../components/common/Dialog';
import { Calendar, CalendarProps, Field, Form } from '../../components/form';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Optional, OptionalClass } from '../../utils/types';
import { finishVisit } from './visitSlice';
import { formatISO } from 'date-fns';

export interface FinishVisitFormData {
  finishDate: string;
}

const schema = {
  finishDate: yup.string().required('Date time is required'),
};

const finishVisitDefault: FinishVisitFormData = {
  finishDate: formatISO(new Date()),
};

console.log({ finishVisitDefault });

export interface FinishVisitDialogMethods {
  open: (id: string) => void;
}

const FinishVisitDialog = React.forwardRef<FinishVisitDialogMethods, any>(
  (props, ref) => {
    const dispatch = useAppDispatch();

    const [id, setId] = useState<OptionalClass<string>>(
      Optional.empty<string>()
    );

    const dialogRef = useRef<DialogMethods>(null);

    const { loading } = useAppSelector((state) => state.visit);

    const onSubmit: SubmitHandler<FinishVisitFormData> = ({ finishDate }) => {
      if (id.isPresent()) {
        dispatch(finishVisit({ id: id.get(), finishDate }));
        dialogRef.current?.close();
      }
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          open(visitIdToOpen) {
            setId(Optional<string>(visitIdToOpen));
            dialogRef.current?.open();
          },
        };
      },
      []
    );

    return (
      <Dialog
        {...props}
        ref={dialogRef}
        id="finishVisit"
        header="Set your visit end time!"
      >
        <Form<FinishVisitFormData>
          schema={schema}
          onSubmit={onSubmit}
          className="p-fluid"
          defaultValues={finishVisitDefault}
        >
          <Field<CalendarProps>
            label="Finish date/time"
            name="finishDate"
            component={Calendar}
            hourFormat="24"
            showTime
          />
          <Button
            type="submit"
            label="Finish"
            className="my-4"
            loading={loading}
          />
        </Form>
      </Dialog>
    );
  }
);

export default React.memo(FinishVisitDialog);
