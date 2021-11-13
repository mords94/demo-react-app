import { OptionalValue } from '../../utils/types';
import { Place } from './Place';
import { Guest } from './User';

export interface Visit {
  id: number;
  guests: Guest[];
  place: Place;
  visitDate: string;
  finishDate: OptionalValue<string>;
}
