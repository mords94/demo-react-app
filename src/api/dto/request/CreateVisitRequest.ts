import { Visit } from '../Visit';

export type CreateVisitRequest = Pick<Visit, 'place' | 'guests'>;
