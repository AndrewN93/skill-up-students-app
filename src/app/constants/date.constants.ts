import { PartialDateTimeUnit } from '../types/date.types';

export const DATE_RANGES: Record<PartialDateTimeUnit, PartialDateTimeUnit> = {
  year: 'year',
  month: 'month',
  week: 'week',
};

export const DATE_RANGES_FILTER_DICTIONARY: Record<
  PartialDateTimeUnit,
  string
> = {
  year: 'This Year',
  month: 'This Month',
  week: 'This Week',
};
