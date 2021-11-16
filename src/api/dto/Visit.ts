import { format } from 'date-fns';
import { OptionalValue, isNullOrUndefined } from '../../utils/types';
import { Place } from './Place';
import { Guest } from './User';

export interface Visit {
  id?: number;
  guests: Guest[];
  place: Place;
  visitDate: string;
  finishDate: OptionalValue<string>;
}

export const formatDate = (finishDate: OptionalValue<string>) =>
  isNullOrUndefined(finishDate)
    ? ''
    : format(new Date(finishDate), 'LLL do hh:ii');
