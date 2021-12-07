import React from 'react';
import {
  Calendar as PrimeCalendar,
  CalendarChangeParams,
  CalendarProps as PrimeCalendarProps,
} from 'primereact/calendar';
import { formatISO } from 'date-fns';
import { isNullOrUndefined } from '../../utils/types';

const isValidDate = (dateObject: Date) =>
  dateObject.toString() !== 'Invalid Date';

export interface CalendarProps
  extends Omit<PrimeCalendarProps, 'onChange' | 'value'> {
  onChange?: (params: { value?: string }) => void;
  value?: string;
  defaultValue?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  value: valueProps = '',
  onChange: onChangeProps,
  ...props
}) => {
  const dateObject = new Date(Date.parse(valueProps));
  const value = isValidDate(dateObject) ? dateObject : undefined;

  const onChange = (event: CalendarChangeParams) => {
    if (isNullOrUndefined(event?.target?.value)) {
      onChangeProps?.({ value: undefined });
      return;
    }

    if (!(event.target.value instanceof Date)) {
      throw new Error('Calendar field should have a Date value');
    }

    onChangeProps?.({ value: formatISO(event.target.value) });
  };

  return <PrimeCalendar onChange={onChange} value={value} {...props} />;
};

export default Calendar;
