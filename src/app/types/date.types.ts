import { DateTimeUnit } from 'luxon';

export type DateFormatingType = 'D' | 'MMMM' | 'yyyy';
export type PartialDateTimeUnit = Extract<DateTimeUnit, 'year' | 'month' | 'week'>;
